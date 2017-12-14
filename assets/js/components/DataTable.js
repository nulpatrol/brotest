export default class DataTable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        this.div = document.createElement('div');
        this.rowCount = 4;
        this.columnCount = 4;

        this.div.innerHTML = `
            <style></style>
            <table class="data-table-wrapper"></table>
        `;

        shadow.appendChild(this.div);
    }
}
