function showModule(moduleId) {
  const modules = [
    // dashboards module
    // overview module nato for overview analytics reports ng mga total transactions total profit total sold items etc.
    // free suggestions if may maisip kapa
    "overview",
    //  real time metrics more on graph
    "realTimeMetrics",

    // sales management
    // sales report dito naman more on average ng data na napasok sa database dito naten ifefetch
    "salesReports",
    // performance trend dito naman yung graph or charts ng sales per day, week, month, and year
    "performanceTrend",
    // refunds dito naten rerefund yung mga transactions  may form to preformat ka ng design as of now kase sa form mang gagaling yung data na ipupull naten sa database para marefund yung transactions
    "refund",

    // staff management
    // adding staffs dito naman form rin for account creation
    "registerStaff",
    // modify position same rin pre designded form para pasukan ng data
    "modifyPosition",

    // inventory management
    // stock entry predesign form ng insertion of stock
    "stockEntry",
    // dito naman sa stock levels more on graphs to and reports like line chart bat chart or pie charts analytics
    "stockLevel",
    // low stocks history lalabas lang rito charts for analytics views ng mga critical stocks
    "lowStockAlerts",
    // movement hist. dito naman analytics view lang ng galaw ng stocks
    "stocksMovementHistory",

    // product management
    // log waste pre design form para pag pasukan ng data ng product na iwawaste
    "logWaste",
    // disable waste same lang rin dito predesign form na paglalagyan ng data ng item na ididisable much better if kaya mo drop down or choice mo basta best sa UX
    "disableItem",
    // movement hist. dito naman analytics view lang ng galaw ng product
    "productMovementHistory",

    //customer management
    // satisfaction dashboard dito naman more on overview ng feedbacks like chat box graphs pie charts etc.
    "satisfactionDashboard",
    // complaints management eto mga low rate feedbacks lalabas dito then may viewing rin ng contacts ng  cust. para magawan ng solution
    "complaintsManagement",
    // rewards & loyalty program dito naman yung analytics view ng mga registered customer na may rewarding card or app
    "rewards&LoyaltyProgram",
    // discount dashboard dito naman lalabas yung mga senoirs and PWD transactions
    "discountDashboard",
  ];

  modules.forEach((module) => {
    const el = document.getElementById(module);
    if (el) el.classList.add("hidden");
  });

  const activeModule = document.getElementById(moduleId);
  if (activeModule) activeModule.classList.remove("hidden");
}

// ===================================================
//        ACTIVE CLASS SIDEBAR STARTS HERE
//===================================================
window.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".navItem");

  // Get ang last active module from localStorage then fallback to 'overview'
  const activeModule = localStorage.getItem("activeModule") || "overview";
  showModule(activeModule);

  // Remove active class from all, then add to stored one
  navItems.forEach((el) => {
    el.classList.remove(
      "bg-[var(--background-color)]",
      "text-[var(--text-color)]"
    );
    if (el.dataset.module === activeModule) {
      el.classList.add(
        "bg-[var(--background-color)]",
        "text-[var(--text-color)]"
      );
    }
  });
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const module = item.dataset.module;
      showModule(module);

      // Store to localStorage
      localStorage.setItem("activeModule", module);

      // Update active class
      navItems.forEach((el) =>
        el.classList.remove(
          "bg-[var(--background-color)]",
          "text-[var(--text-color)]"
        )
      );
      item.classList.add(
        "bg-[var(--background-color)]",
        "text-[var(--text-color)]"
      );
    });
  });
});
// ===================================================
//        ACTIVE CLASS SIDEBAR ENDS HERE
//===================================================

// ========================================================
// SALES OVERVIEW CHART STARTS HERE
// ========================================================
const salesCtx = document.getElementById("salesChart").getContext("2d");

const salesData = {
  day: {
    labels: ["9AM", "11AM", "1PM", "3PM", "5PM"],
    data: [300, 450, 350, 500, 620],
  },
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [1200, 1500, 1000, 1800, 1600, 2100, 1700],
  },
  month: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [5200, 6100, 5800, 6900],
  },
};

const salesChart = new Chart(salesCtx, {
  type: "line",
  data: {
    labels: salesData.week.labels,
    datasets: [
      {
        label: "₱ Sales",
        data: salesData.week.data,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "₱" + value,
        },
      },
    },
  },
});

document.getElementById("salesFilter").addEventListener("change", function () {
  const value = this.value;
  salesChart.data.labels = salesData[value].labels;
  salesChart.data.datasets[0].data = salesData[value].data;
  salesChart.update();
});
// ========================================================
// SALES OVERVIEW CHART ENDS HERE
// ========================================================

// ========================================================
// TOP SELLING PRODUCTS CHART STARTS HERE
// ========================================================
const productCtx = document.getElementById("productChart").getContext("2d");

const productData = {
  day: {
    labels: ["Fruit tea", "Praf", "Hot Choco"],
    data: [20, 15, 10],
  },
  week: {
    labels: [
      "Hot Brew",
      "Milk Tea",
      "Iced Coffee",
      "fruit Tea",
      "Praf",
      "Promos",
    ],
    data: [120, 93, 75, 68, 55],
  },
  month: {
    labels: [
      "Milk Tea",
      "fruit Tea",
      "Hot Brew",
      "Praf",
      "Iced Coffee",
      "Promos",
    ],
    data: [400, 350, 320, 280, 200, 180],
  },
};

const productChart = new Chart(productCtx, {
  type: "bar",
  data: {
    labels: productData.week.labels,
    datasets: [
      {
        label: "Units Sold",
        data: productData.week.data,
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#f87171",
          "#c084fc",
          "#818cf8",
        ],
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  },
});

document
  .getElementById("productFilter")
  .addEventListener("change", function () {
    const value = this.value;
    productChart.data.labels = productData[value].labels;
    productChart.data.datasets[0].data = productData[value].data;
    productChart.update();
  });
// ========================================================
// TOP SELLING PRODUCTS CHART ENDS HERE
// ========================================================

// ========================================================
// DASHBOARD REALTIME DATA DUMMY UPDATES (AUTO-REFRESH)
// ========================================================
setInterval(() => {
  const newSales = Math.floor(Math.random() * 1000 + 45000);
  const newProfit = Math.floor(newSales * 0.18);
  const newSold = Math.floor(Math.random() * 100 + 300);

  document.getElementById("salesAmount").textContent =
    "₱" + newSales.toLocaleString();
  document.getElementById("profitAmount").textContent =
    "₱" + newProfit.toLocaleString();
  document.getElementById("itemsSold").textContent = newSold;
}, 5000);
// ========================================================
// DASHBOARD REALTIME DATA DUMMY UPDATES END
// ========================================================

// ========================================================
// PAYMENT METHOD STARTS HERE
// ========================================================

window.addEventListener("DOMContentLoaded", () => {
  const paymentMethodCtx = document
    .getElementById("paymentMethodChart")
    ?.getContext("2d");

  if (!paymentMethodCtx) {
    console.error("❌ paymentMethodChart canvas not found.");
    return;
  }

  // Custom plugin to draw center total
  const doughnutCenterText = {
    id: "doughnutCenterText",
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

      ctx.save();
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#111";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText("Total", width / 2, height / 2 - 10);
      ctx.fillText(`₱${total.toLocaleString()}`, width / 2, height / 2 + 12);
      ctx.restore();
    },
  };

  const paymentMethodChart = new Chart(paymentMethodCtx, {
    type: "doughnut",
    data: {
      labels: ["Cash", "E-payment"],
      datasets: [
        {
          label: "Payment Methods",
          data: [0, 0],
          backgroundColor: ["#10B981", "#3B82F6"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      animation: {
        duration: 3000,
        easing: "linear",
      },
    },
    plugins: [doughnutCenterText], // ⬅️ Register the plugin
  });

  // Dummy data update function STARTS HERE
  function updatePaymentMethods() {
    const cash = Math.floor(Math.random() * 1000);
    const ePayment = Math.floor(Math.random() * 1000);
    paymentMethodChart.data.datasets[0].data = [cash, ePayment];
    paymentMethodChart.update();
  }
  // Dummy data update function ENDS HERE

  // Initial call + auto update
  updatePaymentMethods();
  setInterval(updatePaymentMethods, 5000);
});
