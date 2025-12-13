import jsPDF from "jspdf";

// --- MENU DATA ---
const menuData = {
    dining: [
        {
            name: "The Vertex Old Fashioned",
            price: "$22",
            desc: "Barrel-aged bourbon, orange oil, smoked demerara",
        },
        {
            name: "Golden Hour",
            price: "$19",
            desc: "Vodka, Chambord, hand-pressed pineapple, prosecco foam",
        },
        {
            name: "Midnight Bloom",
            price: "$18",
            desc: "Lavender syrup, botanical gin, citrus mist, edible florals",
        },
        {
            name: "Bordeaux Reserve 2017",
            price: "$450",
            desc: "Grand Cru — Bordeaux, France",
        },
        {
            name: "Opus One 2018",
            price: "$290",
            desc: "Iconic Napa Valley red blend — USA",
        },
    ],
    wellness: [
        {
            name: "Signature Ritual",
            price: "$260",
            desc: "90 MIN | Swedish, Deep Tissue, and Aromatherapy blend",
        },
        {
            name: "24K Gold Facial",
            price: "$380",
            desc: "75 MIN | Infused with pure gold leaf for luminous glow",
        },
        {
            name: "Himalayan Stone",
            price: "$210",
            desc: "75 MIN | Warm mineral-rich stones release deep tension",
        },
        {
            name: "Deep Hydration",
            price: "$180",
            desc: "60 MIN | Marine botanicals and hyaluronic acid boost",
        },
        {
            name: "Sound Bath",
            price: "$140",
            desc: "45 MIN | Crystal singing bowls for mental clarity",
        },
    ],
};

export const generateMenuPDF = () => {
    // 1. Setup A4 (210mm x 297mm)
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });
    const CENTER_X = 105;

    // Column Centers for Page 2
    const COL_LEFT_X = 55;
    const COL_RIGHT_X = 155;

    // Colors
    const GOLD = "#D4AF37";
    const BLACK = "#000000";
    const DARK_GRAY = "#444444";
    const LIGHT_GRAY = "#999999";

    let currentY = 0;

    // --- HELPER FUNCTIONS ---

    // 1. Draw Border (The "Luxury Frame")
    const drawBorder = () => {
        doc.setDrawColor(GOLD);
        doc.setLineWidth(1.5);
        doc.rect(10, 10, 190, 277);

        doc.setDrawColor(BLACK);
        doc.setLineWidth(0.2);
        doc.rect(12, 12, 186, 273);
    };

    // 2. Footer Helper
    const drawFooter = (page: number) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(LIGHT_GRAY);
        doc.text(`VERTEX LUXURY RESORT   |   PAGE ${page}`, CENTER_X, 280, {
            align: "center",
        });
    };

    // 3. Manual Text Printer
    const printBlock = (
        text: string,
        x: number,
        y: number,
        size: number,
        font: string,
        style: string,
        color: string,
        maxWidth: number
    ) => {
        doc.setFont(font, style);
        doc.setFontSize(size);
        doc.setTextColor(color);

        const lines = doc.splitTextToSize(text, maxWidth);
        const lineHeight = size * 0.4;

        lines.forEach((line: string, index: number) => {
            doc.text(line, x, y + index * lineHeight, { align: "center" });
        });

        return y + lines.length * lineHeight;
    };

    // ==========================================
    // PAGE 1: COVER & WELCOME
    // ==========================================
    drawBorder();

    currentY = 80;
    currentY = printBlock(
        "VERTEX",
        CENTER_X,
        currentY,
        50,
        "times",
        "bold",
        BLACK,
        180
    );
    currentY += 10;
    currentY = printBlock(
        "MODERN SANCTUARY",
        CENTER_X,
        currentY,
        12,
        "helvetica",
        "normal",
        GOLD,
        180
    );

    currentY += 40;

    // Welcome Letter
    currentY = printBlock(
        "A CURATED ESCAPE",
        CENTER_X,
        currentY,
        18,
        "times",
        "bold",
        BLACK,
        180
    );
    currentY += 15;

    const letter =
        "Welcome to Vertex. We believe that true luxury is not just about where you stay, but how you feel.\n\nThis is more than a destination; it is a sanctuary designed to disconnect you from the world and reconnect you with yourself. Immerse yourself completely.";

    currentY = printBlock(
        letter,
        CENTER_X,
        currentY,
        12,
        "times",
        "italic",
        DARK_GRAY,
        120
    );

    currentY += 30;

    // Signature
    currentY = printBlock(
        "Yours in excellence,",
        CENTER_X,
        currentY,
        10,
        "times",
        "italic",
        BLACK,
        120
    );
    currentY += 8;
    printBlock(
        "Abdul Rahman",
        CENTER_X,
        currentY,
        16,
        "times",
        "bolditalic",
        GOLD,
        120
    );

    drawFooter(1);

    // ==========================================
    // PAGE 2: TWO-COLUMN MENU
    // ==========================================
    doc.addPage();
    drawBorder();

    // Page Title
    currentY = 35;
    currentY = printBlock(
        "THE COLLECTION",
        CENTER_X,
        currentY,
        22,
        "times",
        "bold",
        BLACK,
        180
    );
    currentY += 15;

    const startY = currentY;

    // --- LEFT COLUMN: DINING ---
    let leftY = startY;
    leftY = printBlock(
        "THE ALCHEMY BAR",
        COL_LEFT_X,
        leftY,
        12,
        "helvetica",
        "bold",
        GOLD,
        80
    );
    leftY += 10;

    menuData.dining.forEach((item) => {
        leftY = printBlock(
            item.name,
            COL_LEFT_X,
            leftY,
            12,
            "times",
            "bold",
            BLACK,
            80
        );
        leftY += 4;
        leftY = printBlock(
            item.desc,
            COL_LEFT_X,
            leftY,
            9,
            "times",
            "italic",
            DARK_GRAY,
            70
        );
        leftY += 4;
        leftY = printBlock(
            item.price,
            COL_LEFT_X,
            leftY,
            10,
            "helvetica",
            "bold",
            BLACK,
            80
        );
        leftY += 12;
    });

    // --- RIGHT COLUMN: WELLNESS ---
    let rightY = startY;
    rightY = printBlock(
        "THE SANCTUARY",
        COL_RIGHT_X,
        rightY,
        12,
        "helvetica",
        "bold",
        GOLD,
        80
    );
    rightY += 10;

    menuData.wellness.forEach((item) => {
        rightY = printBlock(
            item.name,
            COL_RIGHT_X,
            rightY,
            12,
            "times",
            "bold",
            BLACK,
            80
        );
        rightY += 4;
        rightY = printBlock(
            item.desc,
            COL_RIGHT_X,
            rightY,
            9,
            "times",
            "italic",
            DARK_GRAY,
            70
        );
        rightY += 4;
        rightY = printBlock(
            item.price,
            COL_RIGHT_X,
            rightY,
            10,
            "helvetica",
            "bold",
            BLACK,
            80
        );
        rightY += 12;
    });

    // Vertical Divider Line
    doc.setDrawColor("#E0E0E0");
    doc.setLineWidth(0.1);
    doc.line(105, 50, 105, 250);

    drawFooter(2);

    // ==========================================
    // PAGE 3: BRAND PHILOSOPHY & CONTACT
    // ==========================================
    doc.addPage();
    drawBorder();

    currentY = 50;

    // 1. Philosophy Header (Clean White, matching style)
    currentY = printBlock(
        "THE ART OF LIVING",
        CENTER_X,
        currentY,
        24,
        "times",
        "bold",
        BLACK,
        180
    );
    currentY += 8;
    currentY = printBlock(
        "EST. 2024",
        CENTER_X,
        currentY,
        10,
        "helvetica",
        "normal",
        GOLD,
        180
    );

    currentY += 25;

    // 2. Meaningful Text (Philosophy)
    const p1 =
        "At Vertex, we are guided by a simple philosophy: perfection is not a goal, but a standard. From the organic oils in our spa to the hand-harvested botanicals in our cocktails, every element is chosen with intention.";

    const p2 =
        "We believe in the power of pause. In a world that never stops, we offer a space to breathe, to savor, and to simply be.";

    const p3 =
        "Experience the pinnacle of modern sanctuary. Where architectural brilliance meets the art of living.";

    // Print Paragraphs
    currentY = printBlock(
        p1,
        CENTER_X,
        currentY,
        12,
        "times",
        "normal",
        DARK_GRAY,
        130
    );
    currentY += 12;
    currentY = printBlock(
        p2,
        CENTER_X,
        currentY,
        12,
        "times",
        "normal",
        DARK_GRAY,
        130
    );
    currentY += 12;
    currentY = printBlock(
        p3,
        CENTER_X,
        currentY,
        12,
        "times",
        "italic",
        BLACK,
        130
    );

    currentY += 25;

    // Divider
    doc.setDrawColor(GOLD);
    doc.setLineWidth(0.5);
    doc.line(CENTER_X - 20, currentY, CENTER_X + 20, currentY);
    currentY += 25;

    // 3. Contact Details (Real Data from Footer)
    currentY = printBlock(
        "VISIT US",
        CENTER_X,
        currentY,
        10,
        "helvetica",
        "bold",
        GOLD,
        130
    );
    currentY += 10;

    currentY = printBlock(
        "123 Luxury Avenue, New York, NY 10001",
        CENTER_X,
        currentY,
        11,
        "times",
        "bold",
        BLACK,
        130
    );
    currentY += 6;
    currentY = printBlock(
        "+1 (555) 123-4567",
        CENTER_X,
        currentY,
        11,
        "times",
        "normal",
        DARK_GRAY,
        130
    );
    currentY += 6;
    currentY = printBlock(
        "@vertex-sanctuary.com",
        CENTER_X,
        currentY,
        11,
        "times",
        "normal",
        DARK_GRAY,
        130
    );

    // 4. Developer Credit (Fixed at bottom)
    const bottomY = 250;
    printBlock(
        "Designed & Developed by",
        CENTER_X,
        bottomY,
        9,
        "times",
        "italic",
        LIGHT_GRAY,
        130
    );
    printBlock(
        "ABDUL RAHMAN",
        CENTER_X,
        bottomY + 6,
        11,
        "times",
        "bold",
        GOLD,
        130
    );

    drawFooter(3);

    // Save
    doc.save("Vertex_Full_Experience.pdf");
};
