export class Component {
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

	destroy() {
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
}
