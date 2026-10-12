-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "Criterion" AS ENUM ('AXIOLOGICAL', 'COGNITIVE', 'ACTIVITY', 'REFLECTIVE');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('DOSTON', 'TOLGOV', 'RIVOYAT', 'TARIXIY_ASAR', 'OGZAKI_IJOD', 'ADABIY_ASAR', 'BOSHQA');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('SOURCE_ANALYSIS', 'THOUGHT_ANALYSIS', 'MODERN_LINK');

-- CreateEnum
CREATE TYPE "DiagnosticKind" AS ENUM ('INITIAL', 'FINAL');

-- CreateEnum
CREATE TYPE "TimelineKind" AS ENUM ('DAVR', 'VOQEA', 'MUTAFAKKIR', 'ASAR', 'GOYA');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('DRAFT', 'REVIEWED');

-- CreateEnum
CREATE TYPE "ValueCategory" AS ENUM ('AXIOLOGICAL', 'INTELLECTUAL', 'PATRIOTIC', 'FAMILY', 'LABOR', 'COMMUNICATIVE', 'AESTHETIC', 'REFLECTIVE', 'SOCIAL');

-- CreateEnum
CREATE TYPE "ProgressEntity" AS ENUM ('PERIOD', 'THINKER', 'VALUE', 'SOURCE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "classLevel" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "shortDescription" JSONB NOT NULL,
    "content" JSONB NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thinker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "birthYear" INTEGER,
    "deathYear" INTEGER,
    "biography" JSONB NOT NULL,
    "mainIdeas" JSONB NOT NULL,
    "educationalViews" JSONB NOT NULL,
    "modernImportance" JSONB NOT NULL,
    "image" TEXT,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Thinker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationalValue" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "modernInterpretation" JSONB NOT NULL,
    "category" "ValueCategory" NOT NULL,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationalValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThinkerValue" (
    "thinkerId" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,
    "description" JSONB,
    "sourceId" TEXT,

    CONSTRAINT "ThinkerValue_pkey" PRIMARY KEY ("thinkerId","valueId")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "type" "SourceType" NOT NULL,
    "periodId" TEXT NOT NULL,
    "thinkerId" TEXT,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "educationalMeaning" JSONB NOT NULL,
    "dissertationNote" JSONB,
    "reference" TEXT NOT NULL,
    "image" TEXT,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceValue" (
    "sourceId" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,

    CONSTRAINT "SourceValue_pkey" PRIMARY KEY ("sourceId","valueId")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "title" JSONB NOT NULL,
    "prompt" JSONB NOT NULL,
    "modernExample" JSONB,
    "criterion" "Criterion" NOT NULL,
    "sourceId" TEXT,
    "periodId" TEXT,
    "thinkerId" TEXT,
    "createdById" TEXT,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityOption" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "text" JSONB NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "explanation" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ActivityOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "periodId" TEXT,
    "thinkerId" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestQuestion" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "question" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "criterion" "Criterion" NOT NULL,

    CONSTRAINT "TestQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" JSONB NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TestOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "correct" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "percent" INTEGER NOT NULL,
    "level" "Level" NOT NULL,
    "byCriterion" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAnswer" (
    "id" TEXT NOT NULL,
    "testResultId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "StudentAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnostic" (
    "id" TEXT NOT NULL,
    "kind" "DiagnosticKind" NOT NULL,
    "title" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diagnostic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosticQuestion" (
    "id" TEXT NOT NULL,
    "diagnosticId" TEXT NOT NULL,
    "question" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "criterion" "Criterion" NOT NULL,

    CONSTRAINT "DiagnosticQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosticOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" JSONB NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DiagnosticOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosticResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "diagnosticId" TEXT NOT NULL,
    "kind" "DiagnosticKind" NOT NULL,
    "correct" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "percent" INTEGER NOT NULL,
    "level" "Level" NOT NULL,
    "byCriterion" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiagnosticResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosticAnswer" (
    "id" TEXT NOT NULL,
    "diagnosticResultId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "DiagnosticAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelThreshold" (
    "level" "Level" NOT NULL,
    "minPercent" INTEGER NOT NULL,

    CONSTRAINT "LevelThreshold_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "StudentProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entityType" "ProgressEntity" NOT NULL,
    "entityId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonEntry" (
    "id" TEXT NOT NULL,
    "aspect" JSONB NOT NULL,
    "goldenHorde" JSONB NOT NULL,
    "nogai" JSONB NOT NULL,
    "similarity" JSONB NOT NULL,
    "difference" JSONB NOT NULL,
    "sourceRef" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "ComparisonEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEvent" (
    "id" TEXT NOT NULL,
    "kind" "TimelineKind" NOT NULL,
    "year" INTEGER,
    "yearLabel" TEXT,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "periodId" TEXT,
    "refType" TEXT,
    "refId" TEXT,
    "sourceRef" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "TimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "ActivityAttempt_userId_activityId_idx" ON "ActivityAttempt"("userId", "activityId");

-- CreateIndex
CREATE INDEX "TestResult_userId_idx" ON "TestResult"("userId");

-- CreateIndex
CREATE INDEX "TestResult_testId_idx" ON "TestResult"("testId");

-- CreateIndex
CREATE INDEX "DiagnosticResult_userId_kind_idx" ON "DiagnosticResult"("userId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProgress_userId_entityType_entityId_key" ON "StudentProgress"("userId", "entityType", "entityId");

-- AddForeignKey
ALTER TABLE "Thinker" ADD CONSTRAINT "Thinker_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThinkerValue" ADD CONSTRAINT "ThinkerValue_thinkerId_fkey" FOREIGN KEY ("thinkerId") REFERENCES "Thinker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThinkerValue" ADD CONSTRAINT "ThinkerValue_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "EducationalValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThinkerValue" ADD CONSTRAINT "ThinkerValue_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_thinkerId_fkey" FOREIGN KEY ("thinkerId") REFERENCES "Thinker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceValue" ADD CONSTRAINT "SourceValue_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceValue" ADD CONSTRAINT "SourceValue_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "EducationalValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_thinkerId_fkey" FOREIGN KEY ("thinkerId") REFERENCES "Thinker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityOption" ADD CONSTRAINT "ActivityOption_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityAttempt" ADD CONSTRAINT "ActivityAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityAttempt" ADD CONSTRAINT "ActivityAttempt_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityAttempt" ADD CONSTRAINT "ActivityAttempt_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "ActivityOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_thinkerId_fkey" FOREIGN KEY ("thinkerId") REFERENCES "Thinker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestOption" ADD CONSTRAINT "TestOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "TestQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "TestQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "TestOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticQuestion" ADD CONSTRAINT "DiagnosticQuestion_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "Diagnostic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticOption" ADD CONSTRAINT "DiagnosticOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "DiagnosticQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticResult" ADD CONSTRAINT "DiagnosticResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticResult" ADD CONSTRAINT "DiagnosticResult_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "Diagnostic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticAnswer" ADD CONSTRAINT "DiagnosticAnswer_diagnosticResultId_fkey" FOREIGN KEY ("diagnosticResultId") REFERENCES "DiagnosticResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticAnswer" ADD CONSTRAINT "DiagnosticAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "DiagnosticQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticAnswer" ADD CONSTRAINT "DiagnosticAnswer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "DiagnosticOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineEvent" ADD CONSTRAINT "TimelineEvent_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE SET NULL ON UPDATE CASCADE;
