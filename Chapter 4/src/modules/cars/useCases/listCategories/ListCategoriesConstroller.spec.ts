import request from 'supertest';

import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

import { app } from '@shared/infra/http/app';

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost");
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash(process.env.PASSWORD_ADMIN, 8);

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentx.com.br",
        password: process.env.PASSWORD_ADMIN
      });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app)
      .get('/categories');

    expect(response.status).toBe(201);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });

});