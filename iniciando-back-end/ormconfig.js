const path = require('path');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'gostack',
  password: 'gostack',
  database: 'gostack_gobarber',
  entities: [path.resolve(__dirname, 'src', 'models', '*.ts')],
  migrations: [
    path.resolve(__dirname, 'src', 'database', 'migrations', '*.ts'),
  ],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
