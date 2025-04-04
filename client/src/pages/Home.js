import React, { useEffect } from "react";
import Layout from "../component/Layout";
import "./styles.css";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import axios from "axios";
import Typewriter from "typewriter-effect";

import banner from "../img/gym-banner.jpg";
import Logo from "../img/FlexFitLogo.png";
import Testimonials from "../component/Testimonials";
import { adminMenu, loginMenu } from "../data/menu";
import AnimationWrapper from "../component/AnimationWrapper";

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const menus = user?.isAdmin ? adminMenu : loginMenu;

  //get user
  // eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  return (
    <Layout>
      <AnimationWrapper>
        <div className="bg-bgMain h-screen w-full">
          {/* image */}
          <section className="fixed top-[10%] left-0 w-full  bg-black h-full">
            <div className="md:h-[100vh] h-[470px]">
              <img
                className="h-full w-full object-cover  brightness-50"
                src={banner}
                alt=""
              />
            </div>

            {/* Centered container */}
            <div className="absolute md:top-[45vh] top-[35vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-full">
              {/* Fixed height wrapper for text */}
              <div className="min-h-[150px] flex items-center">
                <p className="text-textHeading md:text-7xl text-5xl px-7 font-gelasio">
                  <Typewriter
                    options={{
                      strings: ["Book Your Workout Slot & Stay Fit!"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </p>
              </div>

              {/* Button with fixed position */}
              <div className="flex md:flex-row flex-col">
                <Link
                  to={"/book-slot"}
                  className="no-underline mt-4 px-4 py-3 rounded-md md:text-2xl text-xl font-worksans bg-btnPrimary text-btnPrimaryText hover:bg-btnPrimaryHover"
                >
                  Book Now
                </Link>
                <Link
                  to={"/slot-list"}
                  className=" no-underline md:hidden mt-4 px-4 py-3 rounded-md md:text-2xl text-xl font-worksans bg-btnSecondary text-btnSecondaryText hover:bg-btnSecondaryHover"
                >
                  My Schedule
                </Link>
              </div>
            </div>
          </section>

          <section className="relative z-10 md:mt-[80vh] mt-[55vh] text-white shadow-lg bg-red-600">
            {/* Why Choose Us Section */}

            <div className="bg-bgMain">
              <div className="pt-8">
                <h2 className="text-btnPrimary text-center text-4xl md:text-5xl font-worksans">
                  Why Choose Us?
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="flex flex-col items-center p-10">
                  <i className="fa-solid fa-clock text-7xl font-bold text-center"></i>
                  <h3 className="text-textHeading text-2xl font-worksans text-center">
                    Flexible Time Slots
                  </h3>
                  <p className="text-textBody text-lg font-worksans text-center">
                    Book at your convenience with flexible scheduling.
                  </p>
                </div>
                <div className="flex flex-col items-center p-10">
                  <i className="fa-solid fa-calendar-check text-7xl font-bold"></i>
                  <h3 className="text-textHeading text-2xl font-worksans text-center">
                    Easy Online Booking
                  </h3>
                  <p className="text-textBody text-lg font-worksans text-center">
                    Reserve your slot with just a few clicks.
                  </p>
                </div>
                <div className="flex flex-col items-center p-10">
                  <i className="fa-solid fa-users text-7xl font-bold"></i>
                  <h3 className="text-textHeading text-2xl font-worksans text-center">
                    Multiple Users per Slot
                  </h3>
                  <p className="text-textBody text-lg font-worksans text-center">
                    Train with your friends by booking the same time slot.
                  </p>
                </div>
                <div className="flex flex-col items-center p-10">
                  <i className="fa-solid fa-bell text-7xl font-bold"></i>
                  <h3 className="text-textHeading text-2xl font-worksans text-center">
                    Instant Notifications
                  </h3>
                  <p className="text-textBody text-lg font-worksans text-center">
                    Get timely slot reminders and updates.
                  </p>
                </div>
              </div>
            </div>

            {/* How to book slot */}

            <div className="bg-bgCard py-12">
              <div className="text-center">
                <h2 className="text-btnPrimary text-4xl md:text-5xl font-worksans">
                  How It Works?
                </h2>
                <p className="text-textBody text-lg mt-2">
                  Follow these simple steps to book your slot.
                </p>
              </div>

              <div className="mt-10 space-y-6 px-6 max-w-4xl mx-auto">
                <div className="flex items-center bg-bgMain p-6 rounded-2xl shadow-lg">
                  <i className="fa-solid fa-clock text-5xl text-btnPrimary mr-6"></i>
                  <div>
                    <h3 className="text-menuTextActive text-2xl font-worksans">
                      Select Date & Time
                    </h3>
                    <p className="text-textBody text-lg">
                      Choose a date and time to check slot availability. If
                      unavailable, select another.
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-bgMain p-6 rounded-2xl shadow-lg">
                  <i className="fa-solid fa-user-check text-5xl text-btnPrimary mr-6"></i>
                  <div>
                    <h3 className="text-menuTextActive text-2xl font-worksans">
                      Book Your Slot
                    </h3>
                    <p className="text-textBody text-lg">
                      Once an available slot is found, confirm your booking.
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-bgMain p-6 rounded-2xl shadow-lg">
                  <i className="fa-solid fa-bell text-5xl text-btnPrimary mr-6"></i>
                  <div>
                    <h3 className="text-menuTextActive text-2xl font-worksans">
                      Receive Confirmation
                    </h3>
                    <p className="text-textBody text-lg">
                      Get a confirmation notification and arrive at the gym on
                      time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Testimonials />

            {/* Footer */}
            <footer class="bg-bgFooter text-white py-6">
              <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                  <div>
                    <h2 class="text-2xl font-bold text-green-500">FlexFit</h2>
                    <p class="text-gray-400 mt-2">
                      Achieve your fitness goals with FlexFit. Book your slots
                      online and train without waiting.
                    </p>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold text-btnPrimary text-center">
                      Quick Links
                    </h3>
                    <ul class="mt-2 space-y-2 text-center">
                      {menus.map((menu) => {
                        return (
                          <li key={menu.id} className=" ">
                            <Link
                              className="no-underline text-gray-400 hover:text-green-500"
                              to={menu.path}
                            >
                              {menu.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold text-green-400">
                      Contact Us
                    </h3>
                    <p class="text-gray-400 mt-2">
                      123 Fitness Street, Your City
                    </p>
                    <p class="text-gray-400">Email: contact@flexfit.com</p>
                    <p class="text-gray-400">Phone: +123 456 7890</p>
                    <div class="flex justify-center  mt-3 space-x-4">
                      <a href="#" class="text-gray-400 hover:text-green-500">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" class="text-gray-400 hover:text-green-500">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a href="#" class="text-gray-400 hover:text-green-500">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="mt-6 text-center text-gray-500 border-t border-gray-700 pt-4">
                  <p>&copy; 2025 FlexFit. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </section>
        </div>
      </AnimationWrapper>
    </Layout>
  );
};

export default Home;
