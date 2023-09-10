
class Stage{

    renew(newType) {
        Object.setPrototypeOf(this, newType);
    }
}

module.exports = Stage;