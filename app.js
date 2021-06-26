var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var breakDef = 5;
var sessionDef = 25;

function getPx() {
  var d = document.documentElement;
  d.clientHeight > d.clientWidth ? d.clientHeight * .21 : d.clientWidth * .21;
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      running: false,
      countState: "Session",
      minutes: sessionDef,
      seconds: 0,
      blength: breakDef,
      slength: sessionDef,
      below: false,
      percent: 0
    };

    _this.handleReset = _this.handleReset.bind(_this);
    _this.handleBDec = _this.handleBDec.bind(_this);
    _this.handleBInc = _this.handleBInc.bind(_this);
    _this.handleSDec = _this.handleSDec.bind(_this);
    _this.handleSInc = _this.handleSInc.bind(_this);
    _this.handleStartStop = _this.handleStartStop.bind(_this);
    _this.handleTime = _this.handleTime.bind(_this);
    _this.handleRun = _this.handleRun.bind(_this);
    _this.handlePercent = _this.handlePercent.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "handleReset",
    value: function handleReset() {
      this.handleRun("Stop");
      this.audioClip.pause();
      this.audioClip.currentTime = 0;
      this.setState({
        running: false,
        countState: "Session",
        minutes: sessionDef,
        seconds: 0,
        blength: breakDef,
        slength: sessionDef,
        below: false,
        percent: 0
      });
    }
  }, {
    key: "handleRun",
    value: function handleRun(val) {
      if (val === "Start") {
        this.runVar = setInterval(this.handleTime, 1000);
        this.setState({
          running: true
        });
      } else if (val === "Stop") {
        clearInterval(this.runVar);
        this.setState({
          running: false
        });
      }
    }
  }, {
    key: "handleBDec",
    value: function handleBDec() {
      if (!this.state.running) {
        if (this.state.countState == "Break" && this.state.blength > 1) {
          this.setState(function (prevState) {
            return {
              blength: prevState.blength - 1,
              minutes: prevState.blength - 1,
              seconds: 0
            };
          });
        } else if (this.state.blength > 1) {
          this.setState(function (prevState) {
            return {
              blength: prevState.blength - 1
            };
          });
        }
      }
    }
  }, {
    key: "handleBInc",
    value: function handleBInc() {
      if (!this.state.running) {
        if (this.state.countState == "Break" && this.state.blength < 60) {
          this.setState(function (prevState) {
            return {
              blength: prevState.blength + 1,
              minutes: prevState.blength + 1,
              seconds: 0,
              below: false
            };
          });
        } else if (this.state.blength < 60) {
          this.setState(function (prevState) {
            return {
              blength: prevState.blength + 1,
              below: false
            };
          });
        }
      }
    }
  }, {
    key: "handleSDec",
    value: function handleSDec() {
      if (!this.state.running) {
        if (this.state.countState == "Session" && this.state.slength > 1) {
          this.setState(function (prevState) {
            return {
              slength: prevState.slength - 1,
              minutes: prevState.slength - 1,
              seconds: 0
            };
          });
        } else if (this.state.slength > 1) {
          this.setState(function (prevState) {
            return {
              slength: prevState.slength - 1
            };
          });
        }
      }
    }
  }, {
    key: "handleSInc",
    value: function handleSInc() {
      if (!this.state.running) {
        if (this.state.countState == "Session" && this.state.slength < 60) {
          this.setState(function (prevState) {
            return {
              slength: prevState.slength + 1,
              minutes: prevState.slength + 1,
              seconds: 0,
              below: false
            };
          });
        } else if (this.state.slength < 60) {
          this.setState(function (prevState) {
            return {
              slength: prevState.slength + 1,
              below: false
            };
          });
        }
      }
    }
  }, {
    key: "handlePercent",
    value: function handlePercent() {
      var totalTime = this.state.countState == "Session" ? this.state.slength * 60 : this.state.blength * 60;
      var currentTime = this.state.minutes * 60 + this.state.seconds;
      console.log("Percented");
      this.setState({ percent: currentTime * 1.0 / totalTime });
    }
  }, {
    key: "handleTime",
    value: function handleTime() {
      if (this.state.seconds > 0) {
        this.setState(function (state) {
          return {
            seconds: state.seconds - 1
          };
        });
        this.handlePercent();
      } else if (this.state.minutes > 0) {
        if (this.state.minutes == 1) {
          this.setState({
            below: true
          });
        }
        this.setState(function (state) {
          return {
            minutes: state.minutes - 1,
            seconds: 59
          };
        });
        this.handlePercent();
      } else {
        if (this.state.countState == "Session") {
          this.audioClip.play();
          this.setState({
            countState: "Break",
            minutes: this.state.blength,
            seconds: 0,
            below: false,
            percent: 0
          });
        } else {
          this.audioClip.play();
          this.setState({
            countState: "Session",
            minutes: this.state.slength,
            seconds: 0,
            below: false,
            percent: 0
          });
        }
      }
    }
  }, {
    key: "handleStartStop",
    value: function handleStartStop() {
      console.log("CLICK");
      console.log(this.state.running);
      if (this.state.running) {
        console.log("Running and gonna stop");
        this.handleRun("Stop");
      } else {
        this.handleRun("Start");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { id: "all" },
        React.createElement(ClockOutline, { percent: this.state.percent, red: this.state.below }),
        React.createElement(
          "div",
          { id: "clock-area" },
          React.createElement(
            "h3",
            { id: "timer-label" },
            this.state.countState
          ),
          React.createElement(
            "h3",
            { id: "time-left",
              className: this.state.below ? "red" : "white" },
            this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes,
            ":",
            this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds
          )
        ),
        React.createElement(
          "div",
          { id: "time-amts" },
          React.createElement(
            "div",
            { id: "break-area" },
            React.createElement(
              "h3",
              { id: "break-label" },
              "Break Length"
            ),
            React.createElement(
              "div",
              { className: "divOrg" },
              React.createElement(
                "button",
                {
                  className: "btnClass",
                  onClick: this.handleBDec,
                  id: "break-decrement" },
                "-"
              ),
              React.createElement(
                "h4",
                { id: "break-length" },
                this.state.blength
              ),
              React.createElement(
                "button",
                {
                  className: "btnClass",
                  onClick: this.handleBInc,
                  id: "break-increment" },
                "+"
              )
            )
          ),
          React.createElement(
            "div",
            { id: "session-area" },
            React.createElement(
              "h3",
              { id: "session-label" },
              "Session Length"
            ),
            React.createElement(
              "div",
              { className: "divOrg" },
              React.createElement(
                "button",
                {
                  className: "btnClass",
                  onClick: this.handleSDec,
                  id: "session-decrement" },
                "-"
              ),
              React.createElement(
                "h4",
                { id: "session-length" },
                this.state.slength
              ),
              React.createElement(
                "button",
                {
                  className: "btnClass",
                  onClick: this.handleSInc,
                  id: "session-increment" },
                "+"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { id: "control-btns" },
          React.createElement(
            "button",
            {
              id: "reset",
              onClick: this.handleReset,
              className: "btnClass" },
            "Reset"
          ),
          React.createElement(
            "button",
            {
              onClick: this.handleStartStop,
              className: "btnClass",
              id: "start_stop" },
            this.state.running ? "Stop" : "Start"
          )
        ),
        React.createElement("audio", {
          id: "beep",
          preload: "auto",
          src: "audio/timer.wav",
          ref: function ref(audio) {
            return _this2.audioClip = audio;
          } })
      );
    }
  }]);

  return App;
}(React.Component);

var ClockOutline = function (_React$Component2) {
  _inherits(ClockOutline, _React$Component2);

  function ClockOutline(props) {
    _classCallCheck(this, ClockOutline);

    var _this3 = _possibleConstructorReturn(this, (ClockOutline.__proto__ || Object.getPrototypeOf(ClockOutline)).call(this, props));

    _this3.state = {
      radius: 0
    };

    _this3.redrawCircle = _this3.redrawCircle.bind(_this3);
    return _this3;
  }

  _createClass(ClockOutline, [{
    key: "redrawCircle",
    value: function redrawCircle() {
      var d = document.documentElement;
      var r = d.clientHeight > d.clientWidth ? d.clientHeight * .21 : d.clientWidth * .21;
      var cir = r * 2 * Math.PI;
      this.setState(function (state) {
        return {
          radius: r,
          circumference: cir,
          dArray: cir + " " + cir
        };
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.redrawCircle();
      window.addEventListener("resize", this.redrawCircle);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.redrawCircle);
    }
  }, {
    key: "render",
    value: function render() {
      var myStyle = {
        r: this.state.radius,
        strokeDasharray: this.state.dArray,
        strokeDashoffset: this.props.percent ? this.props.percent * this.state.circumference : this.state.circumference
      };
      return React.createElement(
        "svg",
        { className: "progress-ring" },
        React.createElement("circle", {
          style: myStyle,
          className: "progress-ring-circle",
          stroke: this.props.red ? "#a83242" : '#187d13',
          strokeWidth: "3",
          fill: "transparent",
          r: "52",
          cx: "50%",
          cy: "50%" })
      );
    }
  }]);

  return ClockOutline;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("App"));