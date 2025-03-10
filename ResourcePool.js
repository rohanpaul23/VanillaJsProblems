class ResourcePool {
    constructor(data = 10) {
        this.resources = Array(data)
    }

    addResource(resource) {
        this.resources.push(resource);
    }

    getSpecificResource(name) {
        this.resources.forEach(resource => {
            if (name !=null &&  resource.name === name && resource.isAvailable) {
                resource.isAvailable = false;
                return resource;
            }
            else {
                return `${name} is not available right now please try again later`;
            }
        });
        return this.resources.pop();
    }

    getAvailableResource() {
        const availableResource = this.resources.filter(resource => resource.isAvailable)[0];
        availableResource.isAvailable = false;
        return availableResource
    }

    releaseResource(resourceName) {
        const availableResource = this.resources.filter(resource => resource.name === resourceName)[0];
        availableResource.isAvailable = false;
        return `${resourceName} is released`;
    }
}


class ResourcePoolMember {
    constructor(name, isAvailable=true) {
        this.name = name;
        this.isAvailable = isAvailable;
    }    
}
