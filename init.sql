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
	`description` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `link` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, PRIMARY KEY (`id`)
);

INSERT INTO `references` VALUES 
	(null, "Github repo", "Lien &agrave; la 'repo' Github.", "https://github.com/Meilky/wood-cutting-tool"),
	(null, "MariaDB", "La basse de donn&#xE9;e utilis&#xE9;.", "https://mariadb.com/kb/en/documentation/"),
	(null, "Nginx", "Le proxy utilis&#xE9;.", "https://nginx.org/en/"),
	(null, "Rust-Lang", "Le language utilis&#xE9; pour coder le 'backend'.", "https://www.rust-lang.org/"),
	(null, "Rust project hiearchy", "Utilis&#xE9; pour sructur&#xE9; tout la structure de fichier de l'api.", "https://medium.com/geekculture/backend-design-actix-web-project-hierarchy-7fc229bd830c"),
	(null, "Rust .env", "Librarie rust utiliser pour acc&#xE9;d&#xE9; aux variables d'environement.", "https://github.com/dotenv-rs/dotenv"),
	(null, "Rust sqlx", "Library rust utilis&#xE9; pour cr&#xE9;er la connection a la db.", "https://github.com/launchbadge/sqlx"),
	(null, "Rust serde", "Library rust utilis&#xE9; pour s&#xE9;rialiser le json dans le 'backend'", "https://serde.rs/"),
	(null, "Typescript-Lang", "Le language utilis&#xE9; pour coder le 'frontend'.", "https://www.typescriptlang.org/"),
	(null, "Canvas 2d rendering context", "Utilis&#xE9; pour les r&#xE9;f&#xE9;rences du context 2d des canvas javascript pour faire aparaitre les coupures.", "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"),
	(null, "React lifecycle", "Utilis&#xE9; pour baser le cycle de vie de mes 'custom component' sur ceux de React.", "https://www.w3schools.com/react/react_lifecycle.asp"),
	(null, "Html element", "Utilis&#xE9; pour les r&#xE9;f&#xE9;rences au &#xE9;l&#xE9;ment html.", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"),
	(null, "Css flex box", "Utilis&#xE9; pour la nav bar, la page des r&#xE9;f&#xE9;rences et la page d'accueil.", "https://www.w3schools.com/css/css3_flexbox_container.asp"),
	(null, "Html form event", "Utilis&#xE9; pour que la page ne 'reload' pas lorsque nous cliquons sur le boutton soumettre dans la page d'accueil.", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event"),
	(null, "Promise.allSettled", "Utilis&#xE9; pour 'fetch' tout les modules sans que tout les 'promise' sois rejet&#xE9; si une 'promise' est rejet&#xE9;.", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled"),
	(null, "Flux architecture", "Utilis&#xE9; pour le 'flow' du 'data' dans le 'frontend'.", "https://www.freecodecamp.org/news/an-introduction-to-the-flux-architectural-pattern-674ea74775c9/")
;

CREATE TABLE `modules` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`origin` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `modules` VALUES
	(null, "Login", "/modules/login/index.js"),
	(null, "Wood Cutting Tool", "/modules/wood-cutting-tool/index.js"),
	(null, "References", "/modules/references/index.js")
;
