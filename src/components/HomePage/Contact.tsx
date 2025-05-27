"use client";
import { BsRocketTakeoff } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { BiErrorCircle } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactWithMe = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const res = await fetch("https://mr7aali.vercel.app/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });
    const result = await res.json();
    reset();
    console.log(result.success);
  };

  return (
    <div
      id="CONTACT"
      // style={{ border: "1px solid red" }}
      className="max-w-[1280px] mt-16 mx-auto grid sm:grid-cols-2 px-5"
    >
      <div className="mb-8">
        <h1 className="font-bold text-[45px] font-serif py-2">
          Got a problem to solve?
        </h1>
        <p className="text-[20px] font-serif font-thin">
          Get your space suit ready and tell me your ideas to{" "}
          <strong>develop</strong> your <strong>dream website</strong>.
        </p>
      </div>

      <div>
        {/* //! form start */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          method="get"
          className="flex flex-col sm:px-4"
          style={{ caretColor: "red" }}
        >
          <div className="">
            <label
              htmlFor="HomePageNameField"
              className=" uppercase font-mono font-bold text-[20px]"
            >
              Your Name
            </label>
            <input
              {...register("name", { required: true })}
              onBlur={() => trigger("name")}
              aria-invalid={errors.name ? "true" : "false"}
              type="text"
              id="HomePageNameField"
              placeholder="Enter Your Name"
              className="w-full border-[2px] focus-within:border-3  focus:border-[#5252ff]  border-[black] outline-none  my-3 font-mono font-extrabold text-[18px] h-[60px] p-[12px]"
            />

            {errors.name && (
              <p className="text-red-600 mb-2 ml-0 font-serif text-[12px] font-semibold flex items-center">
                <BiErrorCircle className="mr-2" /> Name cannot be empty
              </p>
            )}
          </div>
          <div className="pt-">
            <label
              htmlFor="HomePageEmailField"
              className=" uppercase font-mono font-bold text-[20px]"
            >
              Your Email address
            </label>
            <input
              {...register("email", { required: true })}
              onBlur={() => trigger("email")}
              aria-invalid={errors.email ? "true" : "false"}
              type="email"
              id="HomePageEmailField"
              placeholder="Enter Your Email"
              // style={{border:"2px solid black"}}
              className="w-full border-[2px] focus-within:border-3  focus:border-[#5252ff]  border-[black] outline-none  my-3 font-mono font-extrabold text-[18px] h-[60px] p-[12px]"
            />
            {errors.email && (
              <p className="text-red-600 mb-2 ml-0 font-serif text-[12px] font-semibold flex items-center">
                <BiErrorCircle className="mr-2" /> Invalid Email
              </p>
            )}
          </div>
          <div className="pt-">
            <label
              htmlFor="HomemessageField"
              className=" uppercase font-mono font-bold text-[20px]"
            >
              Type Your MESSAGE
            </label>
            <textarea
              {...register("message", { required: true })}
              onBlur={() => trigger("message")}
              aria-invalid={errors.message ? "true" : "false"}
              name="message"
              id="HomemessageField"
              placeholder="Type message..."
              className="w-full border-[2px] focus-within:border-3  focus:border-[#5252ff]  border-[black] outline-none  my-3 font-mono font-extrabold text-[18px] h-[120px] p-[12px]"
            ></textarea>

            {errors.message && (
              <p className="text-red-600 mb-2 ml-0 font-serif text-[12px] font-semibold flex items-center">
                <BiErrorCircle className="mr-2" /> Message box cannot be empty
              </p>
            )}
          </div>
          <div className="flex  w-full items-center">
            <p className="flex-1 text-[18px]  lg:text-[20px] hidden font-mono lg:flex items-center ">
              <span className="mt-2">
                {" "}
                <FiMail />
              </span>{" "}
              <span className="px-2">mr7aali@gmail.com</span>
            </p>
            <button
              type="submit"
              // style={{ border: "3px solid #111" }}

              style={{ border: "2px solid #111" }}
              className="no-underline w-full lg:w-auto  py-2 px-3 lg:py-3 lg:px-5 text-[15px] lg:text-[18px]  hover:bg-slate-400 cursor-pointer bg-slate-300  text-center flex items-center justify-center font-semibold uppercase"
            >
              Hit Me Up{" "}
              <span className="px-1 text-[18px] text-[#7843e9] mt-1 ml-2">
                <BsRocketTakeoff />
              </span>
            </button>
          </div>
        </form>

        {/* //! form end */}
      </div>
    </div>
  );
};

export default ContactWithMe;
