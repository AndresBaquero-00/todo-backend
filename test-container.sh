docker container run ^
-p 3000:3000 ^
--env APP_PORT=3000 ^
--env DB_HOST=localhost ^
--env DB_PORT=5432 ^
--env DB_USER=postgres ^
--env DB_PASSWORD=123456 ^
--env DB_NAME=tododb ^
--env NODE_ENV=development ^
--env JWT_SECRET_KEY=123456 ^
albaqueroh/todo-backend:1.1.0
