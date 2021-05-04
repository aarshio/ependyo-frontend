import React, { useState, useEffect } from "react";

import { Button, Input } from "reactstrap";

import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import MailRuIcon from "mdi-react/MailRuIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Redirect } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import url from "../../../../url.json";
import { toast } from "react-toastify";
import ReactGA from 'react-ga';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("zx59ead7fd") !== null) {
      setAuth(true);
    }
  });

  const submitForm = (e) => {
    e.preventDefault()
    if(username.match(/[^a-z0-9]/)){
      toast.warn("Username cannot contain capital or special characters", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    else if(username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword === 0){
      toast.warn("Please fill out all fields", {
        position: toast.POSITION.TOP_CENTER
      });
    }
     else if (password !== confirmPassword) {
      toast.warn("Passwords do not match", {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (username.length < 3) {
      toast.warn("Username must be longer than 3 characters", {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (username.length > 13) {
      toast.warn("Username must be shorter than 13 characters", {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (password.length < 4) {
      toast.warn("Password must be longer than 4 characters", {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (!isEmail(email)) {
      toast.warn("Invalid email", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      axios
        .post(url.url.concat("register"), {
          username: username,
          email: email,
          password: password
        })
        .then(function(response) {
          try {
            if (response.data.error === "user exists") {
              setAuth(false);
              toast.warn("Sorry, username is already taken", {
                position: toast.POSITION.TOP_CENTER
              });
            } else if (response.data.error === "email exists") {
              setAuth(false);
              toast.warn("An account with this email already exists", {
                position: toast.POSITION.TOP_CENTER
              });
            } else {
              if (response.data.token === "invalid") {
                setAuth(false);
                toast.error("Something went wrong", {
                  position: toast.POSITION.TOP_CENTER
                });
              } else {
                if (localStorage.getItem("zx59ead7fd") === null) {
                  localStorage.setItem("zx59ead7fd", response.data.token);
                  ReactGA.event({
                    category: 'Register',
                    action: 'Registered,  '+username+ ", mail: "+email.substring(0, email.lastIndexOf("@")) +", " +email.substring(email.lastIndexOf("@") +1)
                  })
                }
                setAuth(true);
              }
            }
          } catch {
            setAuth(false);
          }
        })
        .catch(function(error) {
          toast.error("" + error, {
            position: toast.POSITION.TOP_CENTER
          });
        });
    }
  };

  const showPassword = e => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div>
      {auth ? (
        <Redirect to="/" />
      ) : (
        <form className="form" onSubmit={submitForm}>
          <span className="form__form-group-label">Username</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <div className="form__form-group">
              <Input
                name="username"
                component="input"
                type="text"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <span className="form__form-group-label">E-mail</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <MailRuIcon />
            </div>
            <div className="form__form-group">
              <Input
                name="email"
                component="input"
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <div className="form__form-group">
              <Input
                name="password"
                component="input"
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={`form__form-group-button${show ? " active" : ""}`}
              onClick={e => showPassword(e)}
            >
              <EyeIcon />
            </button>
          </div>

          <span className="form__form-group-label">Confirm Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <div className="form__form-group">
              <Input
                name="confirmPassword"
                component="input"
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={`form__form-group-button${show ? " active" : ""}`}
              onClick={e => showPassword(e)}
            >
              <EyeIcon />
            </button>
          </div>
          <br />
          <br />
          <div
            style={{
              "margin-top": "20px",
              "margin-bottom": "20px",
              height: "200px",
              overflow: "auto",
              "font-size": "smaller"
            }}
          >
            <h2>
              <h3>Terms and Conditions</h3>
            </h2>

            <p>Welcome to Ependyo!</p>

            <p>
              These terms and conditions outline the rules and regulations for
              the use of Ependyo's Website, located at ependyo.com.
            </p>

            <p>
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use Ependyo if you do not agree to
              take all of the terms and conditions stated on this page. Our
              Terms and Conditions were created with the help of the{" "}
              <a href="https://www.termsandconditionsgenerator.com">
                Terms And Conditions Generator
              </a>{" "}
              and the{" "}
              <a href="https://www.termsconditionsgenerator.com">
                Terms & Conditions Generator
              </a>
              .
            </p>

            <p>
              The following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company’s terms and conditions. "The
              Company", "Ourselves", "We", "Our" and "Us", refers to our
              Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. All terms refer to the offer, acceptance and
              consideration of payment necessary to undertake the process of our
              assistance to the Client in the most appropriate manner for the
              express purpose of meeting the Client’s needs in respect of
              provision of the Company’s stated services, in accordance with and
              subject to, prevailing law of Netherlands. Any use of the above
              terminology or other words in the singular, plural, capitalization
              and/or he/she or they, are taken as interchangeable and therefore
              as referring to same.
            </p>

            <h3>
              <strong>Cookies</strong>
            </h3>

            <p>
              We employ the use of cookies. By accessing Ependyo, you agreed to
              use cookies in agreement with the Ependyo's Privacy Policy.
            </p>

            <p>
              Most interactive websites use cookies to let us retrieve the
              user’s details for each visit. Cookies are used by our website to
              enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.
            </p>

            <h3>
              <strong>License</strong>
            </h3>

            <p>
              Unless otherwise stated, Ependyo and/or its licensors own the
              intellectual property rights for all material on Ependyo. All
              intellectual property rights are reserved. You may access this
              from Ependyo for your own personal use subjected to restrictions
              set in these terms and conditions.
            </p>

            <p>You must not:</p>
            <ul>
              <li>Republish material from Ependyo</li>
              <li>Sell, rent or sub-license material from Ependyo</li>
              <li>Reproduce, duplicate or copy material from Ependyo</li>
              <li>Redistribute content from Ependyo</li>
            </ul>

            <p>This Agreement shall begin on the date hereof.</p>

            <p>
              Parts of this website offer an opportunity for users to post and
              exchange opinions and information in certain areas of the website.
              Ependyo does not filter, edit, publish or review Comments prior to
              their presence on the website. Comments do not reflect the views
              and opinions of Ependyo,its agents and/or affiliates. Comments
              reflect the views and opinions of the person who post their views
              and opinions. To the extent permitted by applicable laws, Ependyo
              shall not be liable for the Comments or for any liability, damages
              or expenses caused and/or suffered as a result of any use of
              and/or posting of and/or appearance of the Comments on this
              website.
            </p>

            <p>
              Ependyo reserves the right to monitor all Comments and to remove
              any Comments which can be considered inappropriate, offensive or
              causes breach of these Terms and Conditions.
            </p>

            <p>You warrant and represent that:</p>

            <ul>
              <li>
                You are entitled to post the Comments on our website and have
                all necessary licenses and consents to do so;
              </li>
              <li>
                The Comments do not invade any intellectual property right,
                including without limitation copyright, patent or trademark of
                any third party;
              </li>
              <li>
                The Comments do not contain any defamatory, libelous, offensive,
                indecent or otherwise unlawful material which is an invasion of
                privacy
              </li>
              <li>
                The Comments will not be used to solicit or promote business or
                custom or present commercial activities or unlawful activity.
              </li>
            </ul>

            <p>
              You hereby grant Ependyo a non-exclusive license to use,
              reproduce, edit and authorize others to use, reproduce and edit
              any of your Comments in any and all forms, formats or media.
            </p>

            <h3>
              <strong>Hyperlinking to our Content</strong>
            </h3>

            <p>
              The following organizations may link to our Website without prior
              written approval:
            </p>

            <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>
                Online directory distributors may link to our Website in the
                same manner as they hyperlink to the Websites of other listed
                businesses; and
              </li>
              <li>
                System wide Accredited Businesses except soliciting non-profit
                organizations, charity shopping malls, and charity fundraising
                groups which may not hyperlink to our Web site.
              </li>
            </ul>

            <p>
              These organizations may link to our home page, to publications or
              to other Website information so long as the link: (a) is not in
              any way deceptive; (b) does not falsely imply sponsorship,
              endorsement or approval of the linking party and its products
              and/or services; and (c) fits within the context of the linking
              party’s site.
            </p>

            <p>
              We may consider and approve other link requests from the following
              types of organizations:
            </p>

            <ul>
              <li>
                commonly-known consumer and/or business information sources;
              </li>
              <li>dot.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
            </ul>

            <p>
              We will approve link requests from these organizations if we
              decide that: (a) the link would not make us look unfavorably to
              ourselves or to our accredited businesses; (b) the organization
              does not have any negative records with us; (c) the benefit to us
              from the visibility of the hyperlink compensates the absence of
              Ependyo; and (d) the link is in the context of general resource
              information.
            </p>

            <p>
              These organizations may link to our home page so long as the link:
              (a) is not in any way deceptive; (b) does not falsely imply
              sponsorship, endorsement or approval of the linking party and its
              products or services; and (c) fits within the context of the
              linking party’s site.
            </p>

            <p>
              If you are one of the organizations listed in paragraph 2 above
              and are interested in linking to our website, you must inform us
              by sending an e-mail to Ependyo. Please include your name, your
              organization name, contact information as well as the URL of your
              site, a list of any URLs from which you intend to link to our
              Website, and a list of the URLs on our site to which you would
              like to link. Wait 2-3 weeks for a response.
            </p>

            <p>
              Approved organizations may hyperlink to our Website as follows:
            </p>

            <ul>
              <li>By use of our corporate name; or</li>
              <li>
                By use of the uniform resource locator being linked to; or
              </li>
              <li>
                By use of any other description of our Website being linked to
                that makes sense within the context and format of content on the
                linking party’s site.
              </li>
            </ul>

            <p>
              No use of Ependyo's logo or other artwork will be allowed for
              linking absent a trademark license agreement.
            </p>

            <h3>
              <strong>iFrames</strong>
            </h3>

            <p>
              Without prior approval and written permission, you may not create
              frames around our Webpages that alter in any way the visual
              presentation or appearance of our Website.
            </p>

            <h3>
              <strong>Content Liability</strong>
            </h3>

            <p>
              We shall not be hold responsible for any content that appears on
              your Website. You agree to protect and defend us against all
              claims that is rising on your Website. No link(s) should appear on
              any Website that may be interpreted as libelous, obscene or
              criminal, or which infringes, otherwise violates, or advocates the
              infringement or other violation of, any third party rights.
            </p>

            <h3>
              <strong>Your Privacy</strong>
            </h3>

            <p>Please read Privacy Policy</p>

            <h3>
              <strong>Reservation of Rights</strong>
            </h3>

            <p>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You approve to immediately remove
              all links to our Website upon request. We also reserve the right
              to amen these terms and conditions and it’s linking policy at any
              time. By continuously linking to our Website, you agree to be
              bound to and follow these linking terms and conditions.
            </p>

            <h3>
              <strong>Removal of links from our website</strong>
            </h3>

            <p>
              If you find any link on our Website that is offensive for any
              reason, you are free to contact and inform us any moment. We will
              consider requests to remove links but we are not obligated to or
              so or to respond to you directly.
            </p>

            <p>
              We do not ensure that the information on this website is correct,
              we do not warrant its completeness or accuracy; nor do we promise
              to ensure that the website remains available or that the material
              on the website is kept up to date.
            </p>

            <h3>
              <strong>Disclaimer</strong>
            </h3>

            <p>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties and conditions relating to our website
              and the use of this website. Nothing in this disclaimer will:
            </p>

            <ul>
              <li>
                limit or exclude our or your liability for death or personal
                injury;
              </li>
              <li>
                limit or exclude our or your liability for fraud or fraudulent
                misrepresentation;
              </li>
              <li>
                limit any of our or your liabilities in any way that is not
                permitted under applicable law; or
              </li>
              <li>
                exclude any of our or your liabilities that may not be excluded
                under applicable law.
              </li>
            </ul>

            <p>
              The limitations and prohibitions of liability set in this Section
              and elsewhere in this disclaimer: (a) are subject to the preceding
              paragraph; and (b) govern all liabilities arising under the
              disclaimer, including liabilities arising in contract, in tort and
              for breach of statutory duty.
            </p>

            <p>
              As long as the website and the information and services on the
              website are provided free of charge, we will not be liable for any
              loss or damage of any nature.
            </p>
          </div>
          <div className="account__btns" style={{ marginTop: "10px" }}>
            <Button
              type="submit"
              className="btn btn-primary account__btn"
              // onClick={submitForm}
            >
              <span style={{ color: "white" }}>
                I agree with the Terms and Conditions, sign me up!
              </span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
