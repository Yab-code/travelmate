const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', '..', 'logs');
const accessLogPath = path.join(logsDir, 'access.log');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const requestLogger = (req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    const entry = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms ${req.ip}\n`;

    process.stdout.write(entry);
    fs.appendFile(accessLogPath, entry, (err) => {
      if (err) {
        console.error('Failed to write access log:', err.message);
      }
    });
  });

  next();
};

module.exports = { requestLogger };
