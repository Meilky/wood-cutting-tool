class Component {
	element;
	options;
	children;

	constructor(options = {}) {
		this.options = options;
		this.children = options.children || [];
		this.update = this.update.bind(this);
	}

	update() {
		this.destroyChildren();
		if (this.beforeUpdate) this.beforeUpdate();
		if (this.onUpdate) this.onUpdate();
		this.appendChildren();
		if (this.afterUpdate) this.afterUpdate();
	}

	remove() {
		if (this.beforeDestroy) this.beforeDestroy();
		this.destroyChildren();
		this.removeElement();
		if (this.afterDestroy) this.afterDestroy();
	}

	destroyChildren() {
		if (this.children) {
			for (const c of this.children) {
				c.destroy();
			}
		}
	}

	appendChildren() {
		if (this.children) {
			for (const c of this.children) {
				this.element.append(c.element);
			}
		}
	}

	removeElement() {
		if (this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
	}

	get() {
		return this.element;
	}
}

class comp extends Component {
	constructor() {
		super()
		this.init()
	}

	init() {
		this.element = document.createElement("div")
		this.element.innerText = "Hello world";
	}
}


export const component = new comp();


