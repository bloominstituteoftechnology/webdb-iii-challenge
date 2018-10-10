BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `students` (
	`id`	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name`	varchar ( 128 ) NOT NULL,
	`cohort_id`	integer NOT NULL,
	FOREIGN KEY(`cohort_id`) REFERENCES `cohorts`(`id`)
);
INSERT INTO `students` VALUES (1,'Kevin Sooter',1);
INSERT INTO `students` VALUES (2,'Jason Sooter',2);
CREATE TABLE IF NOT EXISTS `knex_migrations_lock` (
	`index`	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	`is_locked`	integer
);
INSERT INTO `knex_migrations_lock` VALUES (1,0);
CREATE TABLE IF NOT EXISTS `knex_migrations` (
	`id`	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name`	varchar ( 255 ),
	`batch`	integer,
	`migration_time`	datetime
);
INSERT INTO `knex_migrations` VALUES (5,'20181010160108_cohort_table.js',1,1539207871934);
INSERT INTO `knex_migrations` VALUES (6,'20181010160136_student_table.js',1,1539207871937);
CREATE TABLE IF NOT EXISTS `cohorts` (
	`id`	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name`	varchar ( 128 ) NOT NULL
);
INSERT INTO `cohorts` VALUES (1,'FSW13');
INSERT INTO `cohorts` VALUES (2,'FSW14');
INSERT INTO `cohorts` VALUES (3,'FSW15');
CREATE UNIQUE INDEX IF NOT EXISTS `student_name` ON `students` (
	`name`
);
CREATE UNIQUE INDEX IF NOT EXISTS `name` ON `cohorts` (
	`name`
);
COMMIT;
