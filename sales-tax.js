//Lighthouse Labs - W1D3 Exercise - Sales Tax Calculator //

var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];


function calcSalesTotals (salesData) {
  var salesDataSum = [];
  for (var i = 0; i < salesData.length; i += 1) {
    var companyInProv = salesData[i];
    var partialsalesData = {
      name: companyInProv.name,
      province: companyInProv.province
    };
    partialsalesData.totalSales = companyInProv.sales.reduce(function(runTotal, currTotal) {
      return runTotal + currTotal;
    }, 0);
    salesDataSum.push(partialsalesData);
  }
  return salesDataSum;
}


function calculateSalesTax(salesData, rates) {
  for (var i = 0; i < salesData.length; i += 1) {
    var province = salesData[i].province;
    var taxRate = rates[province];
    var totalSales = salesData[i].totalSales;
    var totalTax = taxRate * totalSales;
    // Store the result into a new key
    salesData[i].totalTax = totalTax;
  }
  return salesData;
}

function addCompanyTotals(salesData) {
  var company = {};
  for (var i = 0; i < salesData.length; i+= 1) {

    name = salesData[i].name;
    totalSalesValue = salesData[i].totalSales;
    totalTaxesValue = salesData[i].totalTax;

    if (!company[name]) {
      company[name] = {
        totalSales: totalSalesValue,
        totalTaxes: totalTaxesValue
      }
    } else {
      company[name].totalSales += salesData[i].totalSales;
      company[name].totalTaxes += salesData[i].totalTax;
    }
  }
  return company;
}

function salesTaxReport(salesData, taxRates) {
  totalSales = calcSalesTotals(salesData);
  totalSalesAndTax = calculateSalesTax(totalSales, taxRates);
  return addCompanyTotals(totalSalesAndTax);
}


var results = salesTaxReport(companySalesData, salesTaxRates);

console.log(results);
/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/
