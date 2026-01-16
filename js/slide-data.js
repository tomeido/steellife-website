const slideData = {
    totalSlides: 144,
    basePath: 'images/intro_slides/',
    sections: [
        { title: "Introduction", start: 1, end: 1 },
        { title: "Table of Contents", start: 2, end: 2 },
        { title: "Company Introduction", start: 3, end: 15 }, // Estimated
        { title: "Construction Reference", start: 16, end: 30 }, // Estimated
        { title: "Project Management", start: 31, end: 50 }, // Estimated
        { title: "Construction Case", start: 51, end: 100 }, // Estimated
        { title: "Development", start: 101, end: 144 } // Estimated
    ],
    // Helper to generate full paths
    getSlidePath: function (index) {
        return `${this.basePath}slide_${index}.png`;
    }
};

// Export for usage if using modules, but for simple inclusion:
window.slideData = slideData;
