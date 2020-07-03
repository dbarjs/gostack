import {
  getConnectionManager,
  ConnectionManager,
  Connection,
  getConnectionOptions,
  ConnectionOptions,
} from 'typeorm';

export default class Database {
  private manager: ConnectionManager;

  private options: ConnectionOptions;

  private connection: Connection;

  constructor() {
    this.manager = getConnectionManager();
  }

  public async connect(): Promise<Connection> {
    this.options = await getConnectionOptions();
    this.connection = this.manager.create(this.options);

    return await this.connection.connect();
  }
}
