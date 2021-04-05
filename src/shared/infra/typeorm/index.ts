import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (environment: string = 'dev'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()



    return createConnection(
        Object.assign(defaultOptions, {
            host: 'localhost',
            database: environment === "test"
                ? 'rentalcar_test' : 'rentalcar'
        })
    )
}