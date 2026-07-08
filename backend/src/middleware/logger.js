const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });

/**
 * Request logger middleware.
 * Logs HTTP method, URL, status code, duration, and client IP.
 * Output goes to both console and logs/access.log file.
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const { method, originalUrl } = req;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode;
    const timestamp = new Date().toISOString();

    // Color-code status in console
    let statusColor = '\x1b[32m'; // green - 2xx
    if (status >= 400 && status < 500) statusColor = '\x1b[33m'; // yellow - 4xx
    if (status >= 500) statusColor = '\x1b[31m'; // red - 5xx

    const logLine = `[${timestamp}] ${method} ${originalUrl} ${status} ${duration}ms - ${ip}`;
    const coloredLine = `[${timestamp}] ${method} ${originalUrl} ${statusColor}${status}\x1b[0m ${duration}ms - ${ip}`;

    // Console output (colourised)
    console.log(coloredLine);

    // File output (plain text)
    logStream.write(logLine + '\n');
  });

  next();
};

module.exports = { requestLogger };
