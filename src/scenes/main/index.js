import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withRouter } from 'react-router'
import MediaQuery from 'react-responsive'

import Davocat from './davocat.png'
import Dungeonlab from './dungeonlab.png'
import Girl from './girl.jpg'
import Giventure from './giventure.png'
import Greenplug from './greenplug.png'
import Dicepub from './dicepub.png'
import Linkedin from './Logo-2C-28px-R.png'
import Pib from './pib.jpg'
import Portrait from './portrait.jpg'
import Resume from './Resume.pdf'
import Sh from './SH.svg'
import Shark from './shark.jpg'

const FadeIn = props => (
  <div style={{position:"relative",opacity:props.show ? "1" : "0",bottom:props.show ? "0" : "20px",transition:"opacity 0.1s, bottom 0.1s"}}>
    {props.children}
  </div>
);

class DisplayBox extends Component {
  constructor(props) {
    super(props);
    this.state = {open:false}
    this.open = React.createRef();
  }

  render = () => (
    <MediaQuery maxWidth={640}>
    {(match) =>
    <div style={{margin:"10px",paddingBottom:this.props.id === this.props.current ? this.open.current.clientHeight: "", transition:"padding-bottom 0.2s"}}>
      <div onClick={()=>this.props.toggle(this.props.id === this.props.current ? 0 : this.props.id)} style={{cursor:"pointer"}}>
        <img style={{height:"180px",width:"320px",boxShadow:"0 0 1px 1px grey"}} src={this.props.img} alt=""/>
        <div style={{textAlign:"center", color:"white", fontSize:"1.2em"}}>
          {this.props.title}
        </div>
      </div>
      <div style={{backgroundColor:"white",height:this.props.id === this.props.current ? this.open.current.clientHeight: "0",width:"100%",position:"absolute",left:"0",boxShadow:"0 0 1px 1px grey inset",transition:"height 0.2s", overflow:"hidden"}}>
        <img style={{width:"90%",maxWidth:"800px",minWidth:"320px",margin:"10px auto 0",boxShadow:"0 0 1px 1px grey",display:"block"}} src={this.props.img} alt=""/>
        <div style={{padding:"20px " + (match?"10px":"20%")}}>
          <div style={{fontFamily:"'Montserrat', sans-serif", fontSize:"1.5em"}}>
            {this.props.title}
          </div>
          {this.props.children}
        </div>
      </div>
      <div style={{width:"100%",position:"absolute",left:"0",opacity:"0",userSelect:"none",pointerEvents:"none"}} ref={this.open}>
        <img style={{width:"90%",maxWidth:"800px",margin:"10px auto 0",boxShadow:"0 0 1px 1px grey",display:"block"}} src={this.props.img} alt=""/>
        <div style={{padding:"20px " + (match?"10px":"20%")}}>
          <div style={{fontFamily:"'Montserrat', sans-serif", fontSize:"1.5em"}}>
            {this.props.title}
          </div>
          {this.props.children}
        </div>
      </div>
    </div>
    }
    </MediaQuery>
  );
}

class Design extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, points: [], current:0};
    this.cover = React.createRef();
  }

  componentDidMount = () => {
    this.updateDim();
    window.addEventListener('resize', this.updateDim);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDim);
  }

  updateDim = () => {
    const size = 100;
    const points = [];
    for(let i = 0; i < this.cover.current.offsetWidth + 200; i += size){
      const row =[];
      for(let j = 0; j < this.cover.current.offsetHeight + 200; j += size){
        //x, y, color1, color2, order1, order2, diagonal direction
        row.push([i + ((Math.random() - 1) * size * 0.75), j + ((Math.random() - 1) * size * 0.75), 224 + Math.random() * 32, 224 + Math.random() * 32, Math.random(), Math.random(), Math.random()]);
      }
      points.push(row);
    }

    this.setState({width:this.cover.current.offsetWidth, height:this.cover.current.offsetHeight, points:points});
    if(this.state.current < 1){
      const fade = setInterval(() => {
        if(this.state.current < 1){
          this.setState({current:this.state.current + 0.1});
        }
        else{
          clearInterval(fade);
          this.props.callback();
        }
      }, 50);
    }
  }

  render() {
    // const points = [];
    // this.state.points.forEach((row, x) => row.forEach((point, y) => points.push(
    //   <circle cx={point[0]} cy={point[1]} r="2" fill="black" key={x + " " + y}/>
    // )));
    const triangles = [];
    if(this.state.points.length && this.state.points[0].length){
      for(let i = 1; i < this.state.points.length; i++){
        for(let j = 1; j < this.state.points[i].length; j++){
          const point1 = this.state.points[i-1][j-1][0] + "," + this.state.points[i-1][j-1][1];
          const point2 = this.state.points[i-1][j][0] + "," + this.state.points[i-1][j][1];
          const point3 = this.state.points[i][j-1][0] + "," + this.state.points[i][j-1][1];
          const point4 = this.state.points[i][j][0] + "," + this.state.points[i][j][1];
          const color1 = this.state.points[i][j][2];
          const color2 = this.state.points[i][j][3];
          if(this.state.points[i][j][6] > 0.5){
            triangles.push(
              <React.Fragment key={i + " " + j}>
                <polygon points={point1 + " " + point2 + " " + point3} style={{fill:"rgba(" + color1 + "," + color1 + "," + color1 + ")",
                  opacity: this.state.points[i][j][4] < this.state.current?1:0,transition:"opacity 0.1s"}} />
                <polygon points={point2 + " " + point3 + " " + point4} style={{fill:"rgba(" + color2 + "," + color2 + "," + color2 + ")",
                  opacity: this.state.points[i][j][5] < this.state.current?1:0,transition:"opacity 0.1s"}} />
              </React.Fragment>
            )
          }
          else{
            triangles.push(
              <React.Fragment key={i + " " + j}>
                <polygon points={point1 + " " + point2 + " " + point4} style={{fill:"rgba(" + color1 + "," + color1 + "," + color1 + ")",
                  opacity: this.state.points[i][j][4] < this.state.current?1:0,transition:"opacity 0.1s"}} />
                <polygon points={point1 + " " + point3 + " " + point4} style={{fill:"rgba(" + color2 + "," + color2 + "," + color2 + ")",
                  opacity: this.state.points[i][j][5] < this.state.current?1:0,transition:"opacity 0.1s"}} />
              </React.Fragment>
            )
          }
        }
      }
    }
    return (
      <div ref={this.cover} style={{height:"100%", width:"100%", overflow:"hidden", position:"absolute", backgroundColor:"#bbb"}}>
        <svg width={this.state.width} height={this.state.height}>
          {triangles}
          {/*points*/}
        </svg>
      </div>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {counter:0, largeBanner:true, work:0, projects:0, design:0};
    this.about = React.createRef();
    this.work = React.createRef();
    this.projects = React.createRef();
    this.design = React.createRef();
    this.contact = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener('scroll', () => {
      if(this.state.largeBanner && window.pageYOffset > window.innerHeight - 51){
        this.setState({largeBanner:false});
      }
      else if(!this.state.largeBanner && window.pageYOffset < window.innerHeight - 51){
        this.setState({largeBanner:true});
      }
    });

    switch(this.props.location.hash){
      case "#about":
        window.scroll(0,this.about.current.offsetTop - 50);
        break;
      case "#work":
        window.scroll(0,this.work.current.offsetTop - 50);
        break;
      case "#projects":
        window.scroll(0,this.projects.current.offsetTop - 50);
        break;
      case "#design":
        window.scroll(0,this.design.current.offsetTop - 50);
        break;
      case "#contact":
        window.scroll(0,this.contact.current.offsetTop - 50);
        break;
      default:
        break;
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll');
  }

  render() {
    return (
      <MediaQuery maxWidth={825}>
      {(match) =>
      <div>
        <div style={{fontFamily:"'Montserrat', sans-serif", zIndex:"1",fontSize:match?"0.8em":""}}>
          <div style={{height:"50px",width:"100%",display:"flex",position:"fixed",right:"0",top:"0",justifyContent:"space-between",alignItems:"center", zIndex:"2"}}>
            <div>
              <div style={{opacity:this.state.largeBanner ? "0" : "1", transition:"opacity 0.25s"}}>
                <FadeIn show={this.state.counter > 8}>
                  <Link to="/" style={{color:"black",textDecoration:"none",fontSize:match?"":"1.5em",padding:"0 " + (match?"5px":"20px")}} onClick={()=>window.scroll(0,0)}>Simon Huang</Link>
                </FadeIn>
              </div>
            </div>
            <div style={{display:"flex"}}>
              <FadeIn show={this.state.counter > 3}>
                <Link to="#about" style={{color:"black",textDecoration:"none",fontSize:match?"":"1.5em",padding:"0 " + (match?"5px":"20px")}} onClick={()=>window.scroll(0,this.about.current.offsetTop - 50)}>About</Link>
              </FadeIn>
              <FadeIn show={this.state.counter > 4}>
                <Link to="#work" style={{color:"black",textDecoration:"none",fontSize:match?"":"1.5em",padding:"0 " + (match?"5px":"20px")}} onClick={()=>window.scroll(0,this.work.current.offsetTop - 50)}>Work</Link>
              </FadeIn>
              <FadeIn show={this.state.counter > 5}>
                <Link to="#projects" style={{color:"black",textDecoration:"none",fontSize:match?"":"1.5em",padding:"0 " + (match?"5px":"20px")}} onClick={()=>window.scroll(0,this.projects.current.offsetTop - 50)}>Projects</Link>
              </FadeIn>
              <FadeIn show={this.state.counter > 6}>
                <Link to="#design" style={{color:"black",textDecoration:"none",fontSize:match?"":"1.5em",padding:"0 " + (match?"5px":"20px")}} onClick={()=>window.scroll(0,this.design.current.offsetTop - 50)}>Design</Link>
              </FadeIn>
              <FadeIn show={this.state.counter > 7}>
                <Link to="#contact" style={{color:"black",textDecoration:"none",fontSize:match?"":"1.5em",padding:"0 " + (match?"5px":"20px")}} onClick={()=>window.scroll(0,this.contact.current.offsetTop - 50)}>Contact</Link>
              </FadeIn>
            </div>
          </div>
          <Link to="#about" style={{color:"black",textDecoration:"none"}} onClick={()=>window.scroll(0,this.about.current.offsetTop - 50)}>
            <i style={{zIndex:"2",position:"absolute", width:"100%", textAlign:"center", fontSize:"5em", bottom:"30px", opacity:"0.5"}} className="material-icons">
              <FadeIn show={this.state.counter > 9}>
                keyboard_arrow_down
              </FadeIn>
            </i>
          </Link>
          <div style={{fontWeight:"300",width:"100%",height:"100vh", display:"flex", position:this.state.largeBanner ? "absolute" : "fixed", top:this.state.largeBanner ? "0" : "calc(50px - 50vh)", transform:this.state.largeBanner ? "" : "translate(0,-" + window.innerHeight / 2 + "px)",zIndex:"1"/*, transition:"top 1s"*/}}>
            <Design callback={()=>{
              const fade = setInterval(() => {
                if(this.state.counter < 10){
                  this.setState({counter:this.state.counter + 1});
                }
                else{
                  clearInterval(fade);
                }
              }, 150);
            }} large={this.state.largeBanner}/>
            <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
              <FadeIn show={this.state.counter > 0}>
                <div style={{fontSize:"5em"}}>
                  Simon
                  <div style={{paddingLeft:"1ch"}}>Huang</div>
                </div>
              </FadeIn>
              <FadeIn show={this.state.counter > 1}>
                <div style={{height:"2px",fontSize:"5em",width:"7ch", margin:"30px 0",backgroundColor:"black"}}/>
              </FadeIn>
              <FadeIn show={this.state.counter > 2}>
                <div style={{fontSize:"3em",textAlign:"center"}}>
                  Full-Stack Developer
                </div>
              </FadeIn>
              <FadeIn show={this.state.counter > 8}>
                <div style={{fontSize:"2em",marginTop:"10px"}}>
                  me@simonh.io<br/>
                  (650)866-5531
                </div>
              </FadeIn>
            </div>
            {/*
            <div style={{width:"50%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
              <div style={Object.assign({position:"relative",margin:"20px",textAlign:"center",fontSize:"2em",opacity:"0",bottom:"20px",transition:"opacity 0.1s, bottom 0.1s"},this.state.counter > 0 ? {opacity:"1",bottom:"0"} : {})}>
                Creative
              </div>
              <div style={Object.assign({position:"relative",margin:"20px",textAlign:"center",fontSize:"2em",opacity:"0",bottom:"20px",transition:"opacity 0.1s, bottom 0.1s"},this.state.counter > 0 ? {opacity:"1",bottom:"0"} : {})}>
                Skilled
              </div>
              <div style={Object.assign({position:"relative",margin:"20px",textAlign:"center",fontSize:"2em",opacity:"0",bottom:"20px",transition:"opacity 0.1s, bottom 0.1s"},this.state.counter > 0 ? {opacity:"1",bottom:"0"} : {})}>
                Versatile
              </div>
            </div>
            */}
          </div>
        </div>

        <div style={{padding:"20px " + (match?"10px":"20%"), marginTop:window.innerHeight}} ref={this.about}>
          <div style={{fontSize:"3em",margin:"20px 0",font:"'Montserrat', sans-serif",fontWeight:"300"}}>About</div>
          <div style={{fontSize:match?"":"1.2em",lineHeight:match?"":"1.2em"}}>
            <img src={Portrait} alt="" style={{float:match?"":"left",height:"200px",margin:match?"auto":"1ch",borderRadius:"50%",display:match?"block":""}}/>
            <p>
              Hey! I’m Simon Huang and I make websites and web apps, among many other things.
            </p>
            <p>
              I've always known that my passion was in creating things and making my ideas come to life so I've pursued interests in art, design, robotics, and programming. This variety of experiences grants me a greater breadth of knowledge in my work.
            </p>
            <p>
              With my diverse and creative background, I’m used to thinking outside the box and having original ideas. Throughout all my work, you’ll find that my best skill is finding efficient and elegant solutions for complicated problems.
            </p>
            <p>
              If something needs to be designed or built and there is no simple and straightforward path, then I'm your guy!
            </p>
            <div>
              <div style={{margin:"20px 0"}}>
                <span style={{fontSize:"1.2em"}}>Languages</span>: <br/>HTML/CSS, JavaScript, C, C++, Java, PHP, SQL
              </div>
              <div style={{margin:"20px 0"}}>
                <span style={{fontSize:"1.2em"}}>Libraries & APIs</span>: <br/>React, Express.js, Redux, Redux-saga, Angular, jQuery, Node.js, MySQL, Redis, Websocket, Quill.js, Embedly, Bootstrap, Ajax, Facebook API, Twilio
              </div>
              <div style={{margin:"20px 0"}}>
                <span style={{fontSize:"1.2em"}}>Tools</span>: <br/>Google Cloud, Heroku, Microsoft Azure, Git, Trello, FTP
              </div>
            </div>

            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly",alignItems:"center"}}>
              <div>me@simonh.io</div>
              <div>(650)866-5531</div>
              <a href="https://www.linkedin.com/in/simon-huang-25b931104" target="_blank" rel="noopener noreferrer"><img src={Linkedin} alt="LinkedIn" style={{display:"block"}}/></a>
              <a href={Resume} target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </div>
        </div>

        <div style={{backgroundColor:"#666"}} ref={this.work}>
          <div style={{fontSize:"3em",margin:"0 20%", padding:"20px 0", font:"'Montserrat', sans-serif",fontWeight:"300", color:"white"}}>Work</div>
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>
            <DisplayBox toggle={(id)=>this.setState({work:id})} id={1} current={this.state.work} title="Project-in-a-Box" img={Pib}>
              <div style={{fontFamily:"'Montserrat', sans-serif",marginBottom:"0.5em"}}>
                Project Manager<br/>La Jolla, CA<br/>October 2016 - June 2017
              </div>
              <p>
                I was the manager of a team building a service that delivers materials and instructions for science projects to be conducted independently by students. The development of this service is overseen by Truong Nguyen, chair of the Electrical and Computer Engineering department at UCSD.
              </p>
              <p>
                This was my first experience with React. We organized our tasks with Trello and developed the product using Agile principles.
              </p>
              <p>
                Built with Node.js, React, Express.js, and Bootstrap and hosted on Heroku.
              </p>
            </DisplayBox>
            <DisplayBox toggle={(id)=>this.setState({work:id})} id={2} current={this.state.work} title="Giventure" img={Giventure}>
              <div style={{fontFamily:"'Montserrat', sans-serif",marginBottom:"0.5em"}}>
                Full Stack Developer<br/>La Jolla, CA<br/>October 2014 - June 2016
              </div>
              <p>
                I was Head of Web Development for Giventure Inc., a tech startup based in La Jolla, CA sponsored by Microsoft and UCSD. Giventure aims to promote volunteering in companies and organizations by facilitating and gamifying the process of finding and signing up for volunteering opportunities.
              </p>
              <p>
                The product was split into a mobile app for the end user and a web app for administrators. As the web developer, I developed the app to manage administrative functions like event creation, user lists, and checking in.
              </p>
              <p>
                Built with Node.js, AngularJS, Express, Bootstrap, and Facebook API and hosted on Microsoft Azure.
              </p>
            </DisplayBox>
            <DisplayBox toggle={(id)=>this.setState({work:id})} id={3} current={this.state.work} title="Green Plug" img={Greenplug}>
              <div style={{fontFamily:"'Montserrat', sans-serif",marginBottom:"0.5em"}}>
                Web Developer<br/>San Ramon, CA<br/>September 2012 - January 2013
              </div>
              <p>
                This is one of my earliest projects when I mostly made websites without application functionality. I was part of a team of three commissioned to build a front-end website for green tech company Green Plug, Inc.
              </p>
              <p>
                Built with Html, CSS, php, and javascript and hosted on GoDaddy
              </p>
            </DisplayBox>
          </div>
        </div>

        <div style={{backgroundColor:"#666"}} ref={this.projects}>
          <div style={{fontSize:"3em",margin:"0 20%", padding:"20px 0", font:"'Montserrat', sans-serif",fontWeight:"300", color:"white"}}>Projects</div>
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>
            <DisplayBox toggle={(id)=>this.setState({projects:id})} id={1} current={this.state.projects} title="dice.pub" img={Dicepub}>
              <div style={{fontFamily:"'Montserrat', sans-serif",marginBottom:"0.5em"}}>
                <a href="https://www.dice.pub">dice.pub</a>
              </div>
              <p>
                Our board game group picked up Dungeons & Dragons one year and found a lot of fun with it, but we soon found ourselves moving to different cities and making meeting up harder. To make online sessions easier, I built Dice.pub.
              </p>
              <p>
                Dice.pub is a 5th edition Dungeons & Dragons character sheet builder and player. Character data is stored in redux which can be outputed and saved locally and transferred if needed. That data is also used for online, real-time play. Websockets and Redis are used to manage online game server data.
              </p>
              <p>
                Built with Node.js, React, Redux, Express.js, Redis, and Websocket and hosted on Heroku
              </p>
            </DisplayBox>
            <DisplayBox toggle={(id)=>this.setState({projects:id})} id={2} current={this.state.projects} title="Davocat" img={Davocat}>
              <p>
                As an experiment, I wanted to create a sort of message board based on controlled anonymity. Davocat, a corruption of "advocate," is the result. Davocat is forum-like app where content is shared primarily using randomized usernames. Comments and posts are in Quill.js format, comment trees are stored in a MySQL database, and content is previewed with Embedly.
              </p>
              <p>
                Davocat is not currently hosted and I intend to recycle most assets into a future project.
              </p>
              <p>
                Built with Node.js, React, Redux, Express.js, Quill.js and MySQL
              </p>
            </DisplayBox>
          </div>
        </div>

        <div style={{backgroundColor:"#666"}} ref={this.design}>
          <div style={{fontSize:"3em",margin:"0 20%", padding:"20px 0", font:"'Montserrat', sans-serif",fontWeight:"300", color:"white"}}>Design</div>
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>
            <DisplayBox toggle={(id)=>this.setState({design:id})} id={1} current={this.state.design} title="Vector Art" img={Girl}>
              <p>
                I personally prefer vector art over raster art because I feel like I can obtain far more precision with vector graphics. I really like the clean edges, potential to add detail without end, and scalability that I can't really get with pixels.
              </p>
            </DisplayBox>
            <DisplayBox toggle={(id)=>this.setState({design:id})} id={2} current={this.state.design} title="Logos" img={Dungeonlab}>
              <p>
                When creating a logo or a mascot, I start by making dozens of mockups and choose one to refine according to my client's or my own preferences. I'll check in with them every step of the way on how the product looks until it reaches a point where they're satisfied.
              </p>
            </DisplayBox>
            <DisplayBox toggle={(id)=>this.setState({design:id})} id={3} current={this.state.design} title="Sculpture" img={Shark}>
              <p>
                I like bringing my ideas to life and sculpture is about as direct as it gets when it comes to building something in the real world. The materials I specialize in are paper and wire because they're easy to acquire and very flexible. I can choose to add incredible amounts of detail or I can choose to have limitations on how I'm allowed to use the medium to bring out a certain beauty in a work.
              </p>
              <p>
                In the past few years, I've gotten into 3d printing and have created some designs for my own use. I'm currently modeling pieces for my own printer design.
              </p>
            </DisplayBox>
          </div>
        </div>

        <div style={{padding:"0 20%"}} ref={this.contact}>
          <div style={{fontSize:"3em",margin:"20px 0",font:"'Montserrat', sans-serif",fontWeight:"300"}}>Contact</div>
          <div style={{fontSize:"1.5em",lineHeight:"1.5em"}}>
            <div>me@simonh.io</div>
            <div>(650)866-5531</div>
            <a href="https://www.linkedin.com/in/simon-huang-25b931104" target="_blank" rel="noopener noreferrer"><img src={Linkedin} alt="LinkedIn" style={{display:"block"}}/></a>
            <a href={Resume} target="_blank" rel="noopener noreferrer">Resume</a>
            <img src={Sh} alt="" style={{width:"200px", margin:"20px 0",display:"block"}}/>
          </div>
        </div>
      </div>
      }
      </MediaQuery>
    );
  }
}

export default withRouter(Main);
