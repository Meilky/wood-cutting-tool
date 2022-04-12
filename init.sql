CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`email` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`password_hash` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `references` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`description` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`link` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `references` VALUES 
	(null, "MariaDB", "The database used for the projet.", "https://mariadb.com/kb/en/documentation/"),
	(null, "Canvas 2d rendering context", "Utilisé pour les références du context 2d des canvas javascript pour faire aparaitre les coupures.", "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"),
	(null, "React lifecycle", "Utilisé pour baser le cycle de vie de mes 'custom component' sur ceux de React.", "https://www.w3schools.com/react/react_lifecycle.asp"),
	(null, "Html element", "Utilisé pour les références au élément html.", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"),
	(null, "Css flex box", "Utilisé pour la nav bar, la page des références et la page d'accueil.", "https://www.w3schools.com/css/css3_flexbox_container.asp"),
	(null, "Html form event", "Utilisé pour que la page ne 'reload' pas lorsque nous cliquons sur le boutton soumettre dans la page d'accueil.", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event"),
	(null, "Github repo", "Lien à la 'repo' Github.", "https://github.com/Meilky/wood-cutting-tool"),
	(null, "Project hiearchy", "Utilisé pour sructuré tout la structure de fichier de l'api.", "https://medium.com/geekculture/backend-design-actix-web-project-hierarchy-7fc229bd830c"),
	(null, "Rust .env", "Librarie rust utiliser pour accédé aux variables d'environement.", "https://github.com/dotenv-rs/dotenv"),
	(null, "Rust sqlx", "Library rust utilisé pour créer la connection a la db.", "https://github.com/launchbadge/sqlx")
;

CREATE TABLE `modules` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`origin` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `modules` VALUES
	(null, "Wood Cutting Tool", "/modules/wood-cutting-tool/index.js"),
	(null, "References", "/modules/references/index.js")
;
