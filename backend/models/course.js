// Course model (for future database integration)
class Course {
    constructor(title, description, duration, status, price, category, prerequisites, materials, level) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.status = status;
        this.price = price;
        this.category = category;
        this.prerequisites = prerequisites;
        this.materials = materials;
        this.level = level;
    }
}

module.exports = Course;
