import React, { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import Typed from "typed.js";
import "../styles/style.css";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import axios from "axios";
import Swal from "sweetalert2";

function Firstpage () {
  useEffect(() => {
    /*================================ toggle icon navbar ====================================*/
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");

    menuIcon.onclick = () => {
      menuIcon.classList.toggle("bx-x");
      navbar.classList.toggle("active");
    };

    /*================================scroll Sections active  link==============================================*/
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("header nav a");

    window.onscroll = () => {
      sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
          navLinks.forEach((links) => {
            links.classList.remove("active");
            document
              .querySelector(`header nav a[href*="${id}"]`)
              .classList.add("active");
          });
        }
      });

      /*==================Sticky navbar=======================*/
      const header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 100);

      /*================== remove toggle icon navbar when click navbar link(sroll) =======================*/
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    };

    /*================== scroll reveal =======================*/
    ScrollReveal({
      // reset: true,
      distance: "80px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
    ScrollReveal().reveal(
      ".home-img, .services-container, .portfolio-box, .contact form",
      { origin: "bottom" }
    );
    ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
    ScrollReveal().reveal(".home-content p, .about-content", {
      origin: "right",
    });

    /*================== typed js =======================*/
    const typed = new Typed(".multiple-text", {
      strings: ["Full Stack Developer", "Web Designer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  /*================== dark Mode =======================*/
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("darkMode", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("darkMode", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");
  if (selectedTheme === "dark") {
    setDarkMode();
  } else {
    setLightMode();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  /*================== Connetion to backend =======================*/
  let [project, setProject] = useState([]);
  let MyProject = async () => {
    try {
      let url = "http://localhost:5500/api/project";
      let response = await axios.get(url);
      let data = response.data;
      setProject(data.result);
    } catch (error) {
      alert("server Error");
      console.log(error);
    }
  };
  useEffect(() => {
    MyProject();
  },[]);

  /*================== Conneting Message section to backend =======================*/

  let initialUserData = {
    fullname:"",
    email : "",
    MobileNumber :"",
    emailSubject: "",
    description: "",
  };
  let [userData ,setUserData] = useState({...initialUserData});

  let setInputData = (e) =>{
    let {value, name} = e.target;
    setUserData({...userData, [name]: value});
  };
  /*================= Sending message from frontend to backend  ==================== */
  let [erorr, setErorr] = useState(false);
  let saveDetails = async() =>{
    let sendData = {
      name: userData.fullname,
      email: userData.email,
      number: userData.MobileNumber,
      emailSub: userData.emailSubject,
      desc: userData.description
    };
    let url = "http://localhost:5500/api/sending-message";
    if(userData.fullname.length==0||userData.email.length==0||userData.MobileNumber.length==0||userData.emailSubject.length==0||userData.description.length==0){
      setErorr(true)
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please Fill all the Fields",
        showConfirmButton: false,
        timer: 2000,
      });
    }else{
      let {data} = await axios.post(url, sendData);
      if (data.status === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message sent",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => window.location.assign("/"));
      } else {
        alert("Plese fill all the details and try again.");
      } 
    }
  };
  return (
    <div>
      {/* <!-- header design --> */}
      <header className="header">
        <a href="#home" className="logo">
          Port<span>Folio</span>
        </a>

        <i className="bx bx-menu" id="menu-icon"></i>

        <nav className="navbar">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">PortFolio</a>
          <a href="#Contact">Contact</a>
          <a className="dark_mode">
            <input
              className="dark_mode_input"
              type="checkbox"
              id="darkmode-toggle"
              onChange={toggleTheme}
              defaultChecked={selectedTheme === "dark"}
            />
            <label className="dark_mode_label" htmlFor="darkmode-toggle">
              <Sun />
              <Moon />
            </label>
          </a>
        </nav>
      </header>

      {/* <!-- home section design --> */}

      <section className="home" id="home">
        <div className="home-content">
          <h3>Hello, It's Me</h3>
          <h1>Yugank Kumar Yadav</h1>
          <h3>
            And I'm a <span className="multiple-text"></span>
          </h3>
          <p>
            Full stack web developer with experience in building and maintaining
            web applications. Proficient in front-end technologies such as HTML,
            CSS, and JavaScript, as well as back-end technologies such as
            Node.js, PHP, and MySQL. Skilled in agile development, project
            management, and problem-solving.
          </p>
          <ul className="social-icons">
            <li>
              <a
                href="https://www.linkedin.com/in/yugank-yadav/"
                target="_blank"
              >
                <i className="fa fa-linkedin-square" aria-hidden="true"></i>
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com/Yugank_yadav_01?t=cnffE_6AQmEOUeUC-gyKMw&s=09"
                target="_blank"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </li>

            <li>
              <a href="https://github.com/Yugank-yadav" target="_blank">
                <i className="fa fa-github"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/villan_yugank/"
                target="_blank"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </li>
          </ul>
          <a
            href="https://drive.google.com/file/d/1HbkkGylYyLZ3-iA6CN3Es_eXE4DtLB_F/view?usp=share_link"
            className="btn"
            target="_blank"
          >
            Download CV
          </a>
        </div>
        <div className="home-img">
        <img src="./img/assets/img.jpg" alt="" />
        </div>
      </section>
      {/* <!-- End of home section design --> */}

      {/* <!-- About Section design --> */}

      <section className="about" id="about">
        <div className="about-img">
          <img src={"/img/img.jpg"} alt="Internal Error" />
        </div>
        <div className="about-content">
          <h2 className="heading">
            About <span>Me</span>
          </h2>
          <h3>Full Stack Developer</h3>
          <p>
            Hello there! My name is Yugank Kumar Yadav, and I am a full-stack
            developer. I was born on April 27, 2001, and I have always been
            fascinated by the world of technology. I completed my 10th standard
            from Kendriya Vidyalaya in 2019, and after that, I pursued my
            passion for technology by moving to a polytechnic college to study
            computer science engineering.<br /><br /> In 2022, I completed my diploma in
            computer science engineering from Government polytechnic Aurai
            Bhadohi, where I gained expertise in various programming languages
            and frameworks. Some of the programming skills I have are HTML, CSS,
            JavaScript, Python, PHP, OOPS, DBMS, Django, MongoDB, Express js,
            React js, Node js, MySQL, and REST API.<br /><br /> Over the years, I have
            gained experience in developing web applications and solving complex
            problems using my programming skills. I am passionate about
            exploring new technologies and learning new things to improve my
            skills further.<br /><br /> As a full-stack developer, I am capable of working
            on both the frontend and backend of an application. I have
            experience in developing responsive websites and web applications
            that provide a seamless user experience.<br /><br /> In my free time, I like to
            keep myself updated with the latest technology trends and
            developments in the field of computer science. I believe that
            continuous learning is the key to success in this field, and I
            strive to stay ahead of the curve by continuously improving my
            skills and staying up-to-date with the latest technologies.<br /><br /> If you
            want to know more about me or have any questions, feel free to get
            in touch!
          </p>
          {/* <a href="aboutme.html" className="btn">
            Read More
          </a> */}
        </div>
      </section>
      {/* <!-- End of About section design --> */}

      {/* <!-- Services Section design --> */}

      <section className="services" id="services">
        <h2 className="heading">
          My <span>Services</span>
        </h2>
        <div className="services-container">
          <div className="services-box">
            <i className="bx bx-code-alt"></i>
            <h3>Web Development</h3>
            <p>
              I provide professional web development services, utilizing the
              latest technologies to create modern, responsive, and
              user-friendly websites tailored to your business needs.
            </p>
            <a href="/" className="btn">
              Read More
            </a>
          </div>

          <div className="services-box">
            <i className="bx bxs-paint"></i>
            <h3>Grapics Design</h3>
            <p>
              I offer high-quality graphic design services, including logos,
              branding, illustrations, and marketing materials that capture your
              brand's essence and leave a lasting impression on your audience.
            </p>
            <a href="/" className="btn">
              Read More
            </a>
          </div>

          <div className="services-box">
            <i className="bx bxs-graduation"></i>
            <h3>Teaching</h3>
            <p>
              I offer personalized teaching services to help students achieve
              their academic goals. With a focus on individual needs, I provide
              effective and engaging learning experiences.
            </p>
            <a href="/" className="btn">
              Read More
            </a>
          </div>
        </div>
      </section>
      {/* <!-- End of Services section design --> */}

      {/* <!-- PortFolio Section design --> */}

      <section className="portfolio" id="portfolio">
        <h2 className="heading">
          Latest <span>Project</span>
        </h2>
        <div className="portfolio-container">
          {project.map((project)=>{
            return(
            <div key={project._id} className="portfolio-box">
            <img src={"./img/"+project.image} alt="" />
            <div className="portfolio-layer">
              <h4>{project.title}</h4>
              <p>{project.decs}</p>
              <a href="/">
                <i className="bx bx-link-external"></i>
              </a>
            </div>
          </div>);
          })}
        </div>
      </section>
      {/* <!-- End of Services section design --> */}

      {/* <!-- Contact Section design --> */}

      <section className="contact" id="Contact">
        <h2 className="heading">
          Contact <span>Me!</span>
        </h2>
        <form action="/">
          <div className="input-box">
            <input type="text" id="name" placeholder="Full Name" required onChange={setInputData} value={userData.fullname} name="fullname"/>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              required
              onChange={setInputData}
              value={userData.email}
              name="email"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              id="number"
              placeholder="Mobile Number"
              required
              onChange={setInputData}
              value={userData.MobileNumber}
              name="MobileNumber"
            />
            <input
              type="text"
              id="message"
              placeholder="Email subject"
              required
              onChange={setInputData}
              value={userData.emailSubject}
              name="emailSubject"
            />
          </div>
          <textarea
            id=""
            cols="30"
            rows="10"
            placeholder="Your Message"
            onChange={setInputData}
            value={userData.description}
            name="description"
          ></textarea>
          <button type="button" className="btn" onClick={saveDetails}>
            Send Message
          </button>
        </form>
      </section>
      {/* <!-- End of Contact section design --> */}

      {/* <!-- Footer design --> */}

      <footer className="footer">
        <div className="footer-text">
          <p>CopyRight &copy; Yugank Yadav | All Rights Reserved.</p>
        </div>
        <div className="footer-iconTop">
          <a href="#home">
            <i className="bx bx-up-arrow-alt"></i>
          </a>
        </div>
      </footer>
      {/* <!-- End of Footer design --> */}

      {/* <!-- custom js --> */}

      <script src="script.js"></script>
    </div>
  );
};

export default Firstpage;
