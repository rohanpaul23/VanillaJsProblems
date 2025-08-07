class Developer {
  /**
   * Constructor to initialize a Developer instance
   * @param {string} name 
   */
  constructor(name) {
    this.name = name;
    this.skills = new Set();
    this.frameworks = new Set();
  }

  /**
   * Adds a skill to the developer.
   * Throws an error if the skill already exists.
   * @param {string} skill 
   * @returns {Developer} this (to allow chaining)
   */
  addSkill(skill) {
    if (this.skills.has(skill)) {
      throw new Error(`Skill "${skill}" already exists`);
    }
    this.skills.add(skill);
    return this;
  }

  /**
   * Adds a framework to the developer.
   * Throws an error if the framework already exists.
   * @param {string} framework 
   * @returns {Developer} this (to allow chaining)
   */
  addFramework(framework) {
    if (this.frameworks.has(framework)) {
      throw new Error(`Framework "${framework}" already exists`);
    }
    this.frameworks.add(framework);
    return this;
  }

  /**
   * Returns a comma-separated string of all skills.
   * @returns {string}
   */
  getSkills() {
    return [...this.skills].join(',');
  }

  /**
   * Returns a comma-separated string of all frameworks.
   * @returns {string}
   */
  getFrameworks() {
    return [...this.frameworks].join(',');
  }

  /**
   * Checks if a skill exists in the developer's skill set.
   * @param {string} skill 
   * @returns {boolean}
   */
  hasSkill(skill) {
    return this.skills.has(skill);
  }

  /**
   * Removes a skill from the developer.
   * If it doesn't exist, nothing happens.
   * @param {string} skill 
   * @returns {Developer} this (to allow chaining)
   */
  removeSkill(skill) {
    this.skills.delete(skill);
    return this;
  }

  /**
   * Removes a framework from the developer.
   * If it doesn't exist, nothing happens.
   * @param {string} framework 
   * @returns {Developer} this (to allow chaining)
   */
  removeFramework(framework) {
    this.frameworks.delete(framework);
    return this;
  }
}
