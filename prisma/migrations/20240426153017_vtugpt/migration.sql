-- CreateTable
CREATE TABLE "notebooks" (
    "notebook_name" VARCHAR(255) NOT NULL,
    "notebook_id" VARCHAR(255) NOT NULL,
    "uid" VARCHAR(255) NOT NULL,
    "created_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notebooks_pkey" PRIMARY KEY ("notebook_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" VARCHAR(255) NOT NULL,
    "time_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "user_id" VARCHAR(255) NOT NULL,
    "sources" JSONB,
    "notebook_id" TEXT,
    "youtube" TEXT,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "users" (
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "hashed_password" VARCHAR(255),
    "city" VARCHAR(255),
    "college" VARCHAR(255),
    "sem" INTEGER,
    "scheme" VARCHAR(255),
    "branch" VARCHAR(255),
    "passing_year" INTEGER,
    "uid" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "notebooks" ADD CONSTRAINT "notebooks_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_notebook_id_fkey" FOREIGN KEY ("notebook_id") REFERENCES "notebooks"("notebook_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
