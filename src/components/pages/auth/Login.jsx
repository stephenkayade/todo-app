import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Storage from '../../helpers/storage'
import axios from 'axios'
import Alert from '../../layouts/partials/Alert';
import Message from '../../layouts/partials/Message';
import Timer from '../../helpers/Timer';
import SEO from '../../layouts/partials/SEO'

const Login = (props) => {

  const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    code: ''
  });

  const [loading, setLoading] = useState(false);
  const [timerLoading, setTimerLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [msgData, setMsgData] = useState({
    title: '',
    type: 'success',
    message: '',
    buttonText: 'ok'
  });
  const [aData, setAData] = useState({
    show: false,
    type: '',
    message: '',
  });

  const [timer, setTimer] = useState(false);

  useEffect(() => { }, []);

  const togglePass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const msgAction = () => {
    history.push('/register')
  }

  const sendCode = async (e) => {
    e.preventDefault(e)
    setTimerLoading(true)

    await axios.post(`${process.env.REACT_APP_IDENTITY_URL}/emails/send-email-verification`, { email: loginData.email })
      .then((resp) => {

        if (resp.data.error === false) {

          setTimerLoading(false)

          setAData({ ...aData, show: false, type: 'success', message: 'Code sent successfully', })

          setTimeout(() => {
            setAData({ ...aData, show: false })
          }, 5000);

          setTimer(true)
          setTimeout(() => {
            setTimer(false)
          }, 60000);

        }

      })
      .catch((err) => {

        setAData({ ...aData, show: false, type: 'danger', message: err.response.data.message })

        setTimeout(() => {
          setAData({ ...aData, show: false })
          setTimerLoading(false)
        }, 5000);
      })
  }

  const login = async (e) => {
    e.preventDefault();
    if (!loginData.email && !loginData.password) {
      setAData({
        ...aData,
        show: true,
        type: 'danger',
        message: 'all fields are required',
      });

      setTimeout(() => {
        setAData({ ...aData, show: false })
      }, 5000)
    } else if (!loginData.email) {
      setAData({
        ...aData,
        show: true,
        type: 'danger',
        message: 'Enter your email',
      });

      setTimeout(() => {
        setAData({ ...aData, show: false })
      }, 5000);
    } else if (!loginData.password) {
      setAData({
        ...aData,
        show: true,
        type: 'danger',
        message: 'Enter your password',
      });

      setTimeout(() => {
        setAData({ ...aData, show: false })
      }, 5000);
    } else if (step === 1 && !loginData.code) {
      setAData({
        ...aData,
        show: true,
        type: 'danger',
        message: 'Enter Verification code'
      });

      setTimeout(() => {
        setAData({ ...aData, show: false })
      }, 5000);
    } else if (step === 1 && (loginData.code.length < 6 || loginData.code.length > 6)) {
      setAData({
        ...aData,
        show: true,
        type: 'danger',
        message: 'Verification code cannot be less or greater than 6 digits'
      });

      setTimeout(() => {
        setAData({ ...aData, show: false })
      }, 5000);
    } else {
      setLoading(true);

      // most of the time your login is always a post request
      try {
        await axios.post(`${process.env.REACT_APP_IDENTITY_URL}/auth/login-verify`, { ...loginData })
          .then((resp) => {
            console.log(resp);
            if (resp.data.error === true && resp.data.status === 206) {
              setStep(1);
              setLoading(false);
              setTimer(true);
              setTimeout(() => {
                setTimer(false)
              }, 60000);
            }
            if (resp.data.error === false) {

              Storage.saveCredentials(resp.data.token, resp.data.data._id);
              // setMsgData({ ...msgData, type: 'success', title: 'login successful', message: 'you have successfully logged in', buttonText: 'ok' })
              // setStep(2);
              props.history.push('/dashboard')

            }
          }).catch((err) => {

            setAData({
              ...aData,
              show: true,
              type: 'danger',
              message: err.response.data.message
            });

            setTimeout(() => {
              setAData({
                ...aData,
                show: false
              });
              setLoading(false)
            }, 5000)

          })
      }
      catch (err) {
        setAData({
          ...aData,
          show: true,
          type: 'danger',
          message: err.response.data.message
        });

        setTimeout(() => {
          setAData({
            ...aData,
            show: false,
          });
          setLoading(false)
        }, 5000)
      }

    }
  };
  return (
    <>
      <SEO pageTitle="Todo - Login" />
      <section className="auth-box">
        <div className="container">
          <div className="box-wrapper">
            <div className="row">
              <div className="col-md-5 mx-auto">
                <form onSubmit={e => e.preventDefault()}>
                  <h3 className="fs-24 onmine-shaft ui-text text-center mrgb2">Todo</h3>

                  {
                    step === 0 &&
                    <div className="frm-box">
                      <h3 className="fs-24 onmine-shaft ui-text text-center mrgb2">
                        Welcome Back
                      </h3>
                      <Alert show={aData.show} type={aData.type} message={aData.message} />
                      <div className="form-group">
                        <label className="fs-l4 onmine-shaft"> Email Address </label>
                        <input defaultValue={(e) => setLoginData({ ...loginData, email: e.target.value })} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} type="email" className="form-control" placeholder="you@example.com" />
                      </div>
                      <div className="form-group">
                        <label className="fs-l4 onmine-shaft">
                          Enter Password
                        </label>
                        <div className="input-group">
                          <input
                            defaultValue={(e) =>
                              setLoginData({
                                ...loginData,
                                password: e.target.value,
                              })
                            }
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                password: e.target.value,
                              })
                            }
                            type={showPass ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Enter Password"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                              <Link
                                onClick={(e) => togglePass(e)}
                                className="onmine-shaft fs-13"
                              >
                                show
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mrgt2">
                        {loading ? (
                          <button
                            type="submit"
                            className="btn btn-lg btn-block bg-silver onmine-shaft fs-16 font-weight-bold disabled"
                          >
                            Logging you in ...
                          </button>
                        ) : (
                          <button
                            onClick={(e) => login(e)}
                            type="submit"
                            className="btn btn-lg btn-block bg-silver onmine-shaft fs-16 font-weight-bold"
                          >
                            Login
                          </button>
                        )}
                      </div>

                      <div className="ui-text-center mrgb1 mrgt2">
                        <Link to="" className="onblue fs-14">
                          forgot password?
                        </Link>
                        <br />
                        <Link to="" className="onblue fs-14">
                          New User? Register Here
                        </Link>
                      </div>


                    </div>

                  }

                  {
                    step === 1 &&
                    <><div className="frm-box">
                      <h3 className="ui-text-center fs-18 onmineshaft mrgb2">Verification</h3>
                      <Alert show={aData.show} type={aData.type} message={aData.message} />
                      <p className="fs-14 onmineshaft ui-text-center">A 6-digit code has been sent to your email please enter the code below</p>
                      <div className="form-group">
                        <label htmlFor="" className="fs-14 onmineshaft">Enter Verification Code</label>
                        <input defaultValue={e => setLoginData({ ...loginData, code: e.taget.value })} onChange={e => setLoginData({ ...loginData, code: e.target.value })} type="text" className="form-control" placeholder="Enter Verification code" />
                      </div>
                      <div className="form-group ui-text-center">


                        {
                          timer ? (
                            <div className="fs-14">Resend code in <Timer duration={60 * 1} /></div>
                          ) : <>
                            {
                              timerLoading ? (
                                <Link className="onblue fs-15 disabled">Sending Code...</Link>
                              ) : (
                                <Link onClick={e => sendCode(e)} className="onblue fs-15">Resend verification code</Link>
                              )
                            }
                          </>
                        }

                      </div>

                      <div className="form-group mrgt2">
                        {loading ? (
                          <button
                            type="submit"
                            className="btn btn-lg btn-block bg-silver onmine-shaft fs-16 font-weight-bold disabled"
                          >
                            Verifying account ...
                          </button>
                        ) : (
                          <button
                            onClick={(e) => login(e)}
                            type="submit"
                            className="btn btn-lg btn-block bg-silver onmine-shaft fs-16 font-weight-bold"
                          >
                            Verify
                          </button>
                        )}
                      </div>

                    </div></>
                  }

                  {
                    step === 2 &&
                    <Message type={msgData.type} action={msgAction} title={msgData.title} message={msgData.message} buttonText={msgData.buttonText} />
                  }


                </form>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
