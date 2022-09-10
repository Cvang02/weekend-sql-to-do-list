CREATE TABLE "agenda" (
    "id" SERIAL PRIMARY KEY,
	"task" VARCHAR (100) NOT NULL,
	"description" VARCHAR (280) NOT NULL,
	"priority" BOOLEAN DEFAULT FALSE,
    "status" BOOLEAN DEFAULT FALSE
);

INSERT INTO "agenda" 
	("task", "description") 
    VALUES
        ('clean room', 'I need to clean my bedroom.'),
        ('wash dishes', 'I need to wash my dirty dishes.'),
        ('grocery', 'I need to buy fruits and veggies.');