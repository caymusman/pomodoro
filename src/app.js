let breakDef = 5;
let sessionDef = 25;

function getPx(){
  let d = document.documentElement;
  d.clientHeight > d.clientWidth ? d.clientHeight * .21 : d.clientWidth * .21;
}

class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state={
      running: false,
      countState: "Session",
      minutes: sessionDef,
      seconds: 0,
      blength: breakDef,
      slength: sessionDef,
      below: false,
      percent: 0
    }
    
    this.handleReset=this.handleReset.bind(this);
    this.handleBDec=this.handleBDec.bind(this);
    this.handleBInc=this.handleBInc.bind(this);
    this.handleSDec=this.handleSDec.bind(this);
    this.handleSInc=this.handleSInc.bind(this);
    this.handleStartStop=this.handleStartStop.bind(this);
    this.handleTime=this.handleTime.bind(this);
    this.handleRun=this.handleRun.bind(this);
    this.handlePercent=this.handlePercent.bind(this);
  }
  
  handleReset(){
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
  
  handleRun(val){
    if(val==="Start"){
      this.runVar = setInterval(this.handleTime, 1000);
      this.setState({
        running: true
      })
    }else if(val==="Stop"){
      clearInterval(this.runVar);
      this.setState({
        running: false
      })
    }
  }
  
  handleBDec(){
    if(!this.state.running){
      if(this.state.countState == "Break" && this.state.blength > 1){
        this.setState (prevState => ({
          blength: prevState.blength - 1,
          minutes: prevState.blength - 1,
          seconds: 0
      }))}else if(this.state.blength > 1){
        this.setState(prevState => ({
          blength: prevState.blength - 1
        }));
      }
    }
  }
  handleBInc(){
    if(!this.state.running){
      if(this.state.countState == "Break" && this.state.blength < 60){
        this.setState (prevState => ({
          blength: prevState.blength + 1,
          minutes: prevState.blength + 1,
          seconds: 0
      }))}else if(this.state.blength < 60){
        this.setState(prevState => ({
          blength: prevState.blength + 1
        }));
      }
    }
  }
  handleSDec(){
    if(!this.state.running){
      if(this.state.countState == "Session" && this.state.slength > 1){
        this.setState (prevState => ({
          slength: prevState.slength - 1,
          minutes: prevState.slength - 1,
          seconds: 0
      }))}else if(this.state.slength > 1){
        this.setState(prevState => ({
          slength: prevState.slength - 1
        }));
      }
    }
  }
  handleSInc(){
    if(!this.state.running){
      if(this.state.countState == "Session" && this.state.slength < 60){
        this.setState (prevState => ({
          slength: prevState.slength + 1,
          minutes: prevState.slength + 1,
          seconds: 0
      }))}else if(this.state.slength < 60){
        this.setState(prevState => ({
          slength: prevState.slength + 1
        }));
      }
    }
  }

  handlePercent(){
    let totalTime = this.state.countState == "Session" ? this.state.slength * 60 : this.state.blength * 60;
    let currentTime = this.state.minutes * 60 + this.state.seconds;
    console.log("Percented");
    this.setState({percent: currentTime * 1.0/totalTime});
  }
  
  handleTime(){
    if(this.state.seconds > 0){
      this.setState(state => ({
        seconds: state.seconds - 1
      }));
      this.handlePercent();
    }else if(this.state.minutes > 0){
      if(this.state.minutes == 1){
        this.setState({
          below: true
        })
      }
      this.setState(state => ({
        minutes: state.minutes - 1,
        seconds: 59
      }));
      this.handlePercent();
    }else{
      if(this.state.countState == "Session"){
        this.audioClip.play();
        this.setState({
          countState: "Break",
          minutes: this.state.blength,
          seconds: 0,
          below: false,
          percent: 0
        });
      }else{
        this.audioClip.play();
        this.setState({
          countState: "Session",
          minutes: this.state.slength,
          seconds: 0,
          below: false,
          percent: 0
        })
      }
    }
  }
  
  handleStartStop(){
    console.log("CLICK");
    console.log(this.state.running);
    if(this.state.running){
      console.log("Running and gonna stop");
      this.handleRun("Stop");
    }else{
      this.handleRun("Start");
    }
  }
  
  
  render(){
    return(
      <div id="all">
        <ClockOutline percent={this.state.percent} red={this.state.below}/>
        <div id="clock-area">
          <h3 id="timer-label">{this.state.countState}</h3>
          <h3 id="time-left" 
            className={this.state.below ? "red" : "white"}>{this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}:{this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}</h3>
        </div>
        <div id="time-amts">
          <div id="break-area">
            <h3 id="break-label">Break Length</h3>
            <div className="divOrg">
              <button 
                className="btnClass"
                onClick={this.handleBDec} 
                id="break-decrement">-</button>
              <h4 id="break-length">{this.state.blength}</h4> 
              <button 
                className="btnClass"
                onClick={this.handleBInc} 
                id="break-increment">+</button>
            </div>
          </div>
          <div id="session-area">
            <h3 id="session-label">Session Length</h3>
            <div className="divOrg">
              <button 
                className="btnClass"
                onClick={this.handleSDec} 
                id="session-decrement">-</button>
              <h4 id="session-length">{this.state.slength}</h4> 
              <button 
                className="btnClass"
                onClick={this.handleSInc} 
                id="session-increment">+</button>
            </div>
          </div>
        </div>
        <div id="control-btns">
          <button 
              id="reset"
              onClick={this.handleReset}
              className="btnClass">reset</button>
          <button 
            onClick={this.handleStartStop}
            className="btnClass" 
            id="start_stop">start</button>
        </div>
        <audio 
          id="beep"
          preload="auto"
          src="audio/beep.wav"
          ref={(audio) => this.audioClip = audio}></audio>
      </div>
    )
  }
}

class ClockOutline extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      radius: 0
    }

    this.redrawCircle=this.redrawCircle.bind(this);
  }

  redrawCircle(){
    let d = document.documentElement;
    let r = d.clientHeight > d.clientWidth ? d.clientHeight * .21 : d.clientWidth * .21;
    let cir = r * 2 * Math.PI;
    this.setState((state) => ({
        radius: r,
        circumference: cir,
        dArray: `${cir} ${cir}`,
      }));
  }

  componentDidMount(){
    this.redrawCircle();
    window.addEventListener("resize", this.redrawCircle);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.redrawCircle);
  }

  render(){
    let myStyle = {
      r : this.state.radius,
      strokeDasharray: this.state.dArray,
      strokeDashoffset: this.props.percent ? this.props.percent * this.state.circumference : this.state.circumference
    }
    return(
      <svg className="progress-ring">
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#187d13"></stop>
          <stop offset="150%" stopColor="#4d963c"></stop>
        </linearGradient>
        <circle
          style={myStyle}
          className="progress-ring-circle"
          stroke={this.props.red ? "red" : 'url(#linearColors)'}
          strokeWidth="4"
          fill="transparent"
          r="52"
          cx="50%"
          cy="50%"/>
      </svg>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("App"));

