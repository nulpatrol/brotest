export default class DataTable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        this.div = document.createElement('div');

        this.startRowCount = parseInt(this.getAttribute('row-count'), 10) || 1;
        this.startColumnCount = parseInt(this.getAttribute('column-count'), 10) || 1;

        this.rowCount = 0;
        this.columnCount = this.startColumnCount;

        this.div.innerHTML = `
            <style>
                
               .main {
                  display: flex;
                }
                
                .left-col {
                  padding-right: 2px;
                  padding-top: 2px;
                }
                
                .right-col {
                  padding-top: 4px;
                  padding-left: 2px;
                }
                
                .table-footer {
                  padding-left: 54px;
                  padding-top: 2px;
                }
                
                .table-head {
                  padding-left: 54px;
                  padding-bottom: 2px;
                }
                
                .animated .btn {
                  -webkit-transition: 0.5s ease-out;
                  transition: 0.5s ease-out;
                }
                
                .btn {
                  width: 50px;
                  height: 50px;
                  border: none;
                  color: #fff;
                  font-size: 20px;
                  -webkit-transition: background-color 1s ease-out;
                  transition: background-color 1s ease-out;
                }
                
                .btn.delete {
                  background: #b00000;
                  position: relative;
                }
                
                .btn.delete:hover {
                  background: #c64e4d;
                }
                
                .btn.add {
                  background: #f5a214;
                }
                
                .btn.add:hover {
                  background: #f5c24f;
                }
                
                .table {
                  border: 1px #4cabe3 solid;
                  text-align: center;
                }
                
                .table td {
                  background-color: #4cabe3;
                  width: 50px;
                  height: 50px;
                  color: white;
                  font-size: 12px;
                }
            </style>
            <div class="table-wrapper animated">
                <div class="table-head">
                    <button class="btn delete column">-</button>
                </div>
                <div class="main">
                    <div class="left-col">
                        <button class="btn delete row">-</button>
                    </div>
                    <table class="table"></table>
                    <div class="right-col">
                        <button class="btn add column">+</button>
                    </div>
                </div>
                <div class="table-footer">
                    <button class="btn add row">+</button>
                </div>
            </div>
        `;

        shadow.appendChild(this.div);
        this.btnDeleteColumn = this.div.querySelector('.btn.delete.column');
        this.btnDeleteRow = this.div.querySelector('.btn.delete.row');
        this.btnAddColumn = this.div.querySelector('.btn.add.column');
        this.btnAddRow = this.div.querySelector('.btn.add.row');
        this.table = this.div.querySelector('.table');

        this.btnDeleteRow.style.visibility = 'hidden';
        this.btnDeleteColumn.style.visibility = 'hidden';

        for (let i = 0; i < this.startRowCount; i += 1) {
            this.addRow();
        }

        this.table.addEventListener('mousemove', this.mouseEnterCallback.bind(this));
    }

    mouseEnterCallback(e) {
        if (e.target === e.currentTarget) {
            return;
        }

        this.activeColumn = e.target.cellIndex;
        this.activeRow = e.target.parentNode.rowIndex;
        this.btnDeleteColumn.style.left = `${e.target.offsetLeft}px`;
        this.btnDeleteRow.style.top = `${e.target.offsetTop}px`;

        if (this.columnCount > 1) {
            this.btnDeleteColumn.style.visibility = 'visible';
        }

        if (this.rowCount > 1) {
            this.btnDeleteRow.style.visibility = 'visible';
        }
    }

    removeColumn(e) {
        const rows = [].slice.call(this.div.querySelectorAll('.table tr'));
        for (let i = 0; i < rows.length; i += 1) {
            rows[i].deleteCell(this.activeColumn);
        }
        this.columnCount -= 1;
        e.currentTarget.style.visibility = 'hidden';
    }

    removeRow(e) {
        const table = this.div.querySelector('.table');
        table.deleteRow(this.activeRow);
        this.rowCount -= 1;
        e.currentTarget.style.visibility = 'hidden';
    }

    addRow() {
        const row = this.table.insertRow(-1);
        for (let i = 0; i < this.columnCount; i += 1) {
            const cell = row.insertCell(-1);
            cell.innerHTML = `[${this.rowCount}, ${i}]`;
        }
        this.rowCount += 1;
    }

    addColumn() {
        const rows = [].slice.call(this.div.querySelectorAll('.table tr'));
        for (let i = 0; i < rows.length; i += 1) {
            const cell = rows[i].insertCell(-1);
            cell.innerHTML = `[${i}, ${this.columnCount}]`;
        }
        this.columnCount += 1;
    }

    connectedCallback() {
        this.table.addEventListener('mouseleave', (e) => {
            if (!e.relatedTarget.classList.contains('delete')) {
                this.btnDeleteRow.style.visibility = 'hidden';
                this.btnDeleteColumn.style.visibility = 'hidden';
            } else if (e.relatedTarget.classList.contains('column')) {
                this.btnDeleteRow.style.visibility = 'hidden';
            } else if (e.relatedTarget.classList.contains('row')) {
                this.btnDeleteColumn.style.visibility = 'hidden';
            }
        });

        this.btnAddRow.addEventListener('click', this.addRow.bind(this));
        this.btnAddColumn.addEventListener('click', this.addColumn.bind(this));

        this.btnDeleteColumn.addEventListener('click', this.removeColumn.bind(this));
        this.btnDeleteColumn.addEventListener('mouseleave', () => {
            this.btnDeleteColumn.style.visibility = 'hidden';
            this.btnDeleteRow.style.visibility = 'hidden';
        });

        this.btnDeleteRow.addEventListener('click', this.removeRow.bind(this));
        this.btnDeleteRow.addEventListener('mouseleave', () => {
            this.btnDeleteColumn.style.visibility = 'hidden';
            this.btnDeleteRow.style.visibility = 'hidden';
        });
    }
}
