-- database name weekend_to_do_app


CREATE TABLE tasks(
		"id" SERIAL PRIMARY KEY,
		"name" VARCHAR (50) NOT NULL,
		"completed" VARCHAR (1) DEFAULT 'N',
		"notes" VARCHAR (250)
);


INSERT INTO tasks ("name", "completes", "notes")
VALUES ('Wake Up','N','hard one'),
('Shower','N','got to wash off yestarday'),
('Eat a book','N','nummy),
('Walk the Dogs','N','Great day out, enjoy the sun!');


UPDATE tasks SET "name" = 'Wake up early' WHERE "id"=1;
UPDATE tasks SET "completed" = 'Y' WHERE "id"=3;


SELECT * FROM tasks ORDER BY "id" ASC;
SELECT * FROM tasks ORDER BY "completed" DESC;
