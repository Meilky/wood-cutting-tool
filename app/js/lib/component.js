export class Component {
	element;
	options;
	children;
	constructor(options = {}) {
		this.options = options;
		this.children = options.children || [];
		this.render = this.render.bind(this);
	}

	render() {
		if (!this.element) this.createElement();
		this.destroyChildren();
		if (this.beforeRender) this.beforeRender();
		if (this.onRender) this.onRender();
		this.appendChildren();
		if (this.afterRender) this.afterRender();
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
				c.render();
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
