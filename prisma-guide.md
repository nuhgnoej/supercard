## 1. Prisma 설치

```
npm install @prisma/client
npm install --save-dev prisma
```

## 2. Prisma 초기화

```
npx prisma init
```

## 3. Prisma 스키마 설정 (schema.prisma)

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

## 4. 데이터베이스 마이그레이션 - 스키마에 정의된 데이터 모델을 실제 데이터베이스에 반영하는 과정

```
npx prisma migrate dev --name init
```

## 5. prisma 스튜디오로 데이터 확인하기

```
npx prisma studio
```

## 6. Prisma Client를 사용한 데이터 조작

```
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  })
  console.log(newUser)
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
```

## 7. 스키마 파일 수정하고 적용하기

### 7-1. 스키마 파일 수정하기

```
datasource db {
provider = "sqlite"
url      = "file:../data/cards.db"
}

generator client {
provider = "prisma-client-js"
}
```

### 7-2. Prisma 모델 자동 생성

```
데이터를 유지하고 싶다면? npx prisma db push

완전 새롭게 초기화하고 싶다면? npx prisma migrate reset
```

-스키마에 적어놓은 내용을 자동으로 schema.prisma 에 반영해 줌

### 7-3. Prisma Client 생성

```
npx prisma generate
```

### 7-4. 반대로 sql문을 통해서 직접 데이터베이스의 구조를 변경한 경우 이를 거꾸로 스키마 파일에 적용시킬 때

```
npx prisma db pull
npx prisma generate // 스키마에 변경이 생기면 필수적으로 실행해야 한다.
```

## 8. sql문과 prisma 메서드

### 테이블 생성

- SQLite (SQL문): CREATE TABLE IF NOT EXISTS ... prisma migrate dev (자동 생성)

### 데이터 삽입 (INSERT)

- SQLite (SQL문) : sql INSERT INTO cards (title, content) VALUES (?, ?); ts await prisma.card.create({ data: { title: "제목", content: "내용" } });
- Prisma (Prisma Client):

### 데이터 조회

- SQLite (SQL문): (SELECT) sql SELECT \_ FROM cards;
- Prisma (Prisma Client): ts const cards = await prisma.card.findMany();

### 특정 데이터 조회 (WHERE 조건 검색)

- SQLite (SQL문): sql SELECT \_ FROM cards WHERE id = ?;
- Prisma (Prisma Client): ts const card = await prisma.card.findUnique({ where: { id: 1 } });

### 데이터 수정 (UPDATE)

- SQLite (SQL문): sql UPDATE cards SET title = ? WHERE id = ?;
- Prisma (Prisma Client): ts await prisma.card.update({ where: { id: 1 }, data: { title: "새 제목" } });

### 데이터 삭제 (DELETE)

- SQLite (SQL문): sql DELETE FROM cards WHERE id = ?;
- Prisma (Prisma Client): ts await prisma.card.delete({ where: { id: 1 } });
