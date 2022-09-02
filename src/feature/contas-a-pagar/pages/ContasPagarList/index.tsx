import "./ContasPagarList.css";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";

import { useEffect, useRef, useState } from "react";

import { ProductService } from "../../services/ProductService";

const ContasPagarListDT = () => {
  const [products, setProducts] = useState([]);
  const [multiSortMeta, setMultiSortMeta] = useState([
    { field: "category", order: -1 },
  ]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState<any>(null);
  const dt = useRef(null);

  const productService = new ProductService();

  useEffect(() => {
    productService.getProductsSmall().then((data) => setProducts(data));
    initFilters1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value: any) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const priceBodyTemplate = (rowData: any) => {
    return formatCurrency(rowData.price);
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },

      code: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },

      category: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },

      quantity: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },

      price: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValue1("");
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e: any) => {
    const value = e.target.value;
    let _filters1: any = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const renderHeader1 = () => {
    return (
      <>
        <div className="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Limpar"
            className="p-button-outlined"
            onClick={clearFilter1}
          />
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue1}
              onChange={onGlobalFilterChange1}
              placeholder="Pesquisar"
            />
          </span>
        </div>
      </>
    );
  };

  const renderFooter1 = () => {
    return (
      <>
        <div className="flex align-items-center export-buttons">
          <Button
            type="button"
            icon="pi pi-file"
            className="mr-2"
            data-pr-tooltip="CSV"
          />
          <Button
            type="button"
            icon="pi pi-file-excel"
            className="p-button-success mr-2"
            data-pr-tooltip="XLS"
          />
          <Button
            type="button"
            icon="pi pi-file-pdf"
            className="p-button-warning mr-2"
            data-pr-tooltip="PDF"
          />
          <Button
            type="button"
            icon="pi pi-filter"
            className="p-button-info ml-auto"
            data-pr-tooltip="Selection Only"
          />
        </div>
      </>
    );
  };

  const header1 = renderHeader1();
  const footer1 = renderFooter1();

  //   const exportCSV = (selectionOnly: any) => {
  //     dt.current.exportCSV({ selectionOnly });
  //   };

  //   const exportPdf = () => {
  //     import("jspdf").then((jsPDF) => {
  //       import("jspdf-autotable").then(() => {
  //         const doc = new jsPDF.default(0, 0);
  //         doc.autoTable(exportColumns, products);
  //         doc.save("products.pdf");
  //       });
  //     });
  //   };

  //   const exportExcel = () => {
  //     import("xlsx").then((xlsx) => {
  //       const worksheet = xlsx.utils.json_to_sheet(products);
  //       const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //       const excelBuffer = xlsx.write(workbook, {
  //         bookType: "xlsx",
  //         type: "array",
  //       });
  //       saveAsExcelFile(excelBuffer, "products");
  //     });
  //   };

  //   const saveAsExcelFile = (buffer: any, fileName: any) => {
  //     import("file-saver").then((module) => {
  //       if (module && module.default) {
  //         let EXCEL_TYPE =
  //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //         let EXCEL_EXTENSION = ".xlsx";
  //         const data = new Blob([buffer], {
  //           type: EXCEL_TYPE,
  //         });

  //         module.default.saveAs(
  //           data,
  //           fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //         );
  //       }
  //     });
  //   };

  return (
    <div>
      <div className="card">
        <h1>Contas a pagar</h1>
        <Tooltip target=".export-buttons>button" position="bottom" />

        <DataTable
          ref={dt}
          value={products}
          dataKey="id"
          sortMode="multiple"
          responsiveLayout="scroll"
          reorderableColumns
          resizableColumns
          showGridlines
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          filters={filters1}
          filterDisplay="menu"
          header={header1}
          footer={footer1}
          globalFilterFields={[
            "global",
            "code",
            "name",
            "category",
            "quantity",
            "price",
          ]}
          emptyMessage="Nenhum dado encontrado."
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column field="code" header="Código" filter sortable></Column>
          <Column field="name" header="Nome" filter sortable></Column>
          <Column field="category" header="Categoria" filter sortable></Column>
          <Column field="quantity" header="Quantidade" filter sortable></Column>
          <Column
            field="price"
            header="Preço"
            body={priceBodyTemplate}
            filter
            sortable
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default ContasPagarListDT;
