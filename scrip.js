// Project Data Array - EDIT THIS TO CHANGE POPUP CONTENT
const projects = [
    {
        id: 1,
        title: "BMW Car Sales Analysis",
        tools: "SQL + Tableau",
        coverImg: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=200&fit=crop",
        headline: "North America: 40% revenue | $90k+ vehicles drive 38% sales",
        kpiList: [
            { label: "Revenue NA", value: 40, suffix: "%" },
            { label: "Premium Revenue", value: 38, suffix: "%" },
            { label: "Best Year", value: 2022, suffix: "" }
        ],
        insights: "Electric & hybrid sales growing 22% YoY. North America leads with $3.2M in premium vehicle revenue.",
        codeSql: `SELECT region, 
       SUM(sales_volume) as total_sales,
       AVG(price_usd) as avg_price
FROM bmw_sales
WHERE year >= 2020
GROUP BY region
ORDER BY total_sales DESC
LIMIT 3;`,
        explanation: "Cleaned 10,000+ BMW sales records. Performed regional aggregation and premium vehicle analysis. Identified that vehicles priced above $90k generate 38% of total revenue despite being only 15% of units sold.",
        result: "Delivered interactive Tableau dashboard with regional filters, helping sales team focus on high-margin premium segments.",
        dashboardEmbed: '<iframe src="https://public.tableau.com/app/profile/natnael.birhanu/viz/day_2_customer_segmentation/Dashboard3" allowfullscreen></iframe>',
        githubLink: "https://github.com/natnaelaster/bmw-sales-analysis"
    },
    {
        id: 2,
        title: "Customer RFM Segmentation",
        tools: "Python + Tableau",
        coverImg: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=400&h=200&fit=crop",
        headline: "1,319 Champions = 65% revenue | $460K at-risk identified",
        kpiList: [
            { label: "Champions", value: 1319, suffix: "" },
            { label: "At-Risk Revenue", value: 460, suffix: "K" },
            { label: "New/Casual", value: 2308, suffix: "" }
        ],
        insights: "At-risk customers (264) represent high spenders who haven't purchased in 90+ days. Reactivation could recover 30% of $460K at-risk revenue.",
        codeSql: `-- RFM Score Calculation
SELECT customer_id,
       DATEDIFF('2024-01-01', last_purchase_date) as recency,
       COUNT(order_id) as frequency,
       SUM(total_spent) as monetary,
       NTILE(4) OVER (ORDER BY recency DESC) as R_score
FROM customer_transactions
GROUP BY customer_id;`,
        explanation: "Performed RFM analysis on 4,000+ customers using Python Pandas. Segmented into Champions, Loyal, At-Risk, and New/Casual based on Recency, Frequency, and Monetary scores.",
        result: "Created Tableau dashboard tracking segment behavior and recommended targeted retention campaigns for At-Risk segment.",
        dashboardEmbed: '<iframe src="https://public.tableau.com/views/RFMAnalysis_1734567890/Dashboard1?:showVizHome=no&:embed=true" allowfullscreen></iframe>',
        githubLink: "https://github.com/natnaelaster/customer-rfm-analysis"
    },
    {
        id: 3,
        title: "Product Performance & Inventory",
        tools: "Python + Tableau",
        coverImg: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400&h=200&fit=crop",
        headline: "80/20 rule | 12 declining products flagged",
        kpiList: [
            { label: "SKUs Analyzed", value: 3500, suffix: "" },
            { label: "Stockout Risk Reduction", value: 30, suffix: "%" },
            { label: "Declining SKUs", value: 12, suffix: "" }
        ],
        insights: "Top 20% of SKUs generate 80% of revenue. 12 products show consistent 3-month decline. 8 categories have clear seasonal patterns requiring 45-day lead time.",
        codeSql: `WITH sales_velocity AS (
    SELECT stockCode,
           SUM(quantity) / COUNT(DISTINCT DATE(invoice_date)) as velocity
    FROM transactions
    GROUP BY stockCode
)
SELECT stockCode, velocity,
       CASE WHEN velocity > 10 THEN 'Fast'
            WHEN velocity > 2 THEN 'Medium'
            ELSE 'Slow' END as movement_category
FROM sales_velocity;`,
        explanation: "Analyzed 3,500+ SKUs for sales velocity, demand variability (CV), and seasonal patterns. Calculated safety stock using service level (95%) and lead time demand.",
        result: "Delivered inventory optimization dashboard with reorder points, safety stock levels, and seasonal procurement calendar.",
        dashboardEmbed: '<iframe src="https://public.tableau.com/views/InventoryOptimization_1734567891/Dashboard2?:showVizHome=no&:embed=true" allowfullscreen></iframe>',
        githubLink: "https://github.com/natnaelaster/inventory-optimization"
    },
    {
        id: 4,
        title: "Medical Cost Prediction",
        tools: "ML (Linear Regression)",
        coverImg: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=200&fit=crop",
        headline: "25% MAE improvement | Smoking adds +$6,822",
        kpiList: [
            { label: "MAE Improvement", value: 25, suffix: "%" },
            { label: "Smoker Impact", value: 6822, suffix: "USD" },
            { label: "Model R²", value: 78, suffix: "%" }
        ],
        insights: "Smoking status is the strongest predictor (+$6,822 annual cost). BMI >30 adds 18% premium. Geographic variation up to $600/year between regions.",
        codeSql: `# Linear Regression Model
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder

# Encode categorical variables
encoder = OneHotEncoder(drop='first')
X_encoded = encoder.fit_transform(X_categorical)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)`,
        explanation: "Built linear regression model using scikit-learn to predict insurance charges. Features: age, bmi, children, smoker, region, sex. Log transformation improved normality.",
        result: "Deployed predictive underwriting model achieving 25% MAE improvement over baseline ($4,251 vs $5,690).",
        dashboardEmbed: '<div style="background:#2a2a2a; border-radius:24px; padding:20px; text-align:center; color:white;"><i class="fas fa-chart-line" style="font-size:2rem; margin-bottom:10px; display:block;"></i><strong>Model Performance Summary</strong><br>R²: 0.78 | MAE: $4,251 | RMSE: $5,620<br>Cross-validation: 0.76 ± 0.03</div>',
        githubLink: "https://github.com/natnaelaster/insurance-cost-prediction"
    },
    {
        id: 5,
        title: "Web Scraping Laptop Market",
        tools: "Python / BeautifulSoup",
        coverImg: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=200&fit=crop",
        headline: "RAM-price correlation r=0.65 | SSD premium 35%",
        kpiList: [
            { label: "Laptops Scraped", value: 800, suffix: "+" },
            { label: "SSD Premium", value: 35, suffix: "%" },
            { label: "Mean Price", value: 450, suffix: "USD" }
        ],
        insights: "16GB RAM laptops average $650 vs $420 for 8GB (+55% premium). SSD vs HDD price gap: 35%. Strong correlation between RAM and price (r=0.65).",
        codeSql: `import requests
from bs4 import BeautifulSoup
import time

for page in range(1, 51):
    url = f'https://jumia.ug/laptops/?page={page}'
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract product info
    products = soup.find_all('article', class_='prd')
    time.sleep(1)  # Rate limiting`,
        explanation: "Scraped 50 pages (800+ products) from Jumia Uganda. Extracted RAM, storage, CPU using regex patterns. Cleaned currency (UGX → USD) and filtered outliers.",
        result: "Delivered price segmentation dashboard showing market trends, spec-based pricing, and competitive analysis.",
        dashboardEmbed: '<iframe src="https://public.tableau.com/views/LaptopPriceAnalysis_1734567892/Dashboard3?:showVizHome=no&:embed=true" allowfullscreen></iframe>',
        githubLink: "https://github.com/natnaelaster/web-scraping-laptops"
    },
    {
        id: 6,
        title: "HubSpot CRM Analytics",
        tools: "SQL + Power BI",
        coverImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
        headline: "$6M revenue | 57% win rate | Top agent: 67%",
        kpiList: [
            { label: "Total Revenue", value: 6, suffix: "M" },
            { label: "Win Rate", value: 57, suffix: "%" },
            { label: "Top Agent WR", value: 67, suffix: "%" }
        ],
        insights: "MG Advanced product generated $2.2M (37% of revenue). US_West region leads with $2.2M. Average sales cycle: 62 days. Q2 has highest win rate (64%).",
        codeSql: `WITH agent_performance AS (
    SELECT agent,
           COUNT(CASE WHEN stage = 'Won' THEN 1 END) * 1.0 / COUNT(*) as win_rate,
           SUM(close_value) as revenue
    FROM sales_pipeline
    GROUP BY agent
)
SELECT agent, win_rate, revenue
FROM agent_performance
ORDER BY win_rate DESC;`,
        explanation: "Merged HubSpot CRM datasets (accounts, pipeline, products, teams) using SQL joins. Built Power BI dashboard with DAX measures for win rate, sales cycle, and revenue by region.",
        result: "Delivered interactive Power BI dashboard enabling sales leadership to track performance and identify improvement opportunities.",
        dashboardEmbed: '<iframe title="HubSpot Sales Dashboard" src="https://app.powerbi.com/view?r=eyJrIjoiZGVtb3NhbXBsZSIsImciOiJzYW1wbGUifQ&embed=true" allowfullscreen></iframe>',
        githubLink: "https://github.com/natnaelaster/hubspot-crm-analytics"
    }
];

// Modal Open Function - DO NOT EDIT THIS
function openProjectModal(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 1.8rem;">📌 ${project.title}</h2>
        </div>
        
        <p><strong>🛠️ Tools & Technologies:</strong> ${project.tools}</p>
        
        <div class="kpi-modal-grid">
            ${project.kpiList.map(k => `
                <div class="kpi-badge">
                    <div class="kpi-number-animate" data-target="${k.value}" data-suffix="${k.suffix}">0</div>
                    <div style="font-size: 0.8rem; opacity: 0.8;">${k.label}</div>
                </div>
            `).join('')}
        </div>
        
        <p><strong>📖 Project Explanation:</strong><br>${project.explanation}</p>
        
        <p><strong>💡 Key Business Insights:</strong><br>${project.insights}</p>
        
        <div class="dashboard-embed">
            <div style="background: rgba(0,0,0,0.4); padding: 8px 12px; font-size: 0.8rem; border-radius: 16px 16px 0 0;">
                <i class="fas fa-chart-line"></i> Live Dashboard Preview
            </div>
            ${project.dashboardEmbed}
        </div>
        
        <p><strong>💻 Code Snippet (${project.tools.includes('SQL') ? 'SQL' : 'Python'}):</strong></p>
        <pre><code>${escapeHtml(project.codeSql)}</code></pre>
        
        <p><strong>✅ Business Outcome:</strong><br>${project.result}</p>
        
        <div style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 25px; flex-wrap: wrap;">
            <a href="${project.githubLink}" target="_blank" class="modal-button" style="background: rgba(90, 122, 46, 0.3); color: white; border: 1px solid rgba(255,255,255,0.2);">
                <i class="fab fa-github"></i> View Code on GitHub
            </a>
            <button class="modal-button" onclick="document.getElementById('projectModal').style.display='none'" style="background: var(--olive-muted);">
                Close
            </button>
        </div>
    `;
    
    document.getElementById('projectModal').style.display = 'flex';
    
    // Animate KPI numbers
    const counters = modalBody.querySelectorAll('.kpi-number-animate');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = current + (suffix ? ' ' + suffix : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (suffix ? ' ' + suffix : '');
            }
        };
        updateCounter();
    });
}

// Helper function to escape HTML
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Modal close handlers
document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('projectModal').style.display = 'none';
});

window.onclick = (e) => {
    if (e.target === document.getElementById('projectModal')) {
        document.getElementById('projectModal').style.display = 'none';
    }
};