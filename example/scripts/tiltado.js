/**
 * Tiltado is a small vanilla Javascript plugin that tilts the thing that you put into it
 */
var Tiltado = /** @class */ (function () {
    function Tiltado(element, options) {
        if (options === void 0) { options = {
            radius: 40,
            perspective: 1000
        }; }
        this.element = element;
        this.options = options;
        this.element = element;
        this.options = options;
        this.init();
    }
    Tiltado.prototype.init = function () {
        this.addTiltableProperties();
        this.addElementEventListeners();
    };
    Tiltado.prototype.addElementEventListeners = function () {
        this.element.addEventListener('mousemove', this.mouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this));
    };
    Tiltado.prototype.mouseMove = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        var _b = this.calculateAxis(clientX, clientY), axisX = _b.axisX, axisY = _b.axisY;
        this.element.style.transform = "\n      perspective(".concat(this.options.perspective, "px)\n      scale3d(1, 1, 1)\n      rotatey(").concat(-axisX / this.options.radius, "deg)\n      rotatex(").concat(axisY / this.options.radius, "deg)\n      ");
    };
    Tiltado.prototype.calculateAxis = function (clientX, clientY) {
        var axisX = clientX - (this.element.offsetLeft + this.element.offsetWidth / 2);
        var axisY = clientY - (this.element.offsetTop + this.element.offsetHeight / 2);
        return { axisX: axisX, axisY: axisY };
    };
    Tiltado.prototype.mouseLeave = function () {
        Object.assign(this.element.style, {
            transform: "scale3d(1, 1, 1)\n      rotatey(0deg)\n      rotatex(0deg)"
        });
    };
    Tiltado.prototype.addTiltableProperties = function () {
        Object.assign(this.element.style, {
            transform: 'perspective(1000px)',
            'transform-style': 'preserve-3d'
        });
    };
    return Tiltado;
}());
;
(function () {
    var tiltado = document.querySelectorAll('[data-tiltado]');
    tiltado.forEach(function (tilt) {
        return new Tiltado(tilt, {
            perspective: 1000,
            radius: 40
        });
    });
})();
export default Tiltado;
