import { Container, format, transports } from 'winston';

const { combine, label, prettyPrint, printf, timestamp } = format;

const loggers = {};
const container = new Container();

const createLogger = ({
  category,
  label: categoryLabel,
  level,
  timestamp: timestampFormat
}) => {
  let formatter = data => `[${data.level}][${data.label}] ${data.message}`;
  const formatters = [label({ categoryLabel })];

  if (timestampFormat) {
    formatters.push(timestamp({ format: timestampFormat }));
    formatter = data =>
      `${data.timestamp} [${data.level}][${data.label}] ${data.message}`;
  }

  formatters.push(prettyPrint(), printf(formatter));
  container.add(category, {
    transports: [
      new transports.Console({
        level,
        format: combine.apply(null, formatters)
      })
    ]
  });

  return container.get(category);
};

export default options => {
  const { category } = options;

  if (!loggers[category]) {
    loggers[category] = createLogger(options);
  }

  return loggers[category];
};
