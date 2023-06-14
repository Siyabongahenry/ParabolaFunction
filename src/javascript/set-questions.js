import { questions } from "./questions-data";

let question_count=0;

const question = document.getElementById("question");

const option_aCheckbox = document.getElementById("option-a-checkbox");
const option_aLabel = document.getElementById("option-a-label");

const option_bCheckbox = document.getElementById("option-b-checkbox");
const option_bLabel =  document.getElementById("option-b-label");

const option_cCheckbox = document.getElementById("option-c-checkbox");
const option_cLabel = document.getElementById("option-c-label");

const prev_btn = document.getElementById("btn-prev-question");
const next_btn = document.getElementById("btn-next-question");

prev_btn.addEventListener("click",(e)=>{
    if(question_count > 0)
    {
       next_btn.innerText="Next";

        question_count--;

        question.innerText =(question_count+1)+". "+questions[question_count].question;
        option_aLabel.innerText = questions[question_count].a;
        option_bLabel.innerText = questions[question_count].b;
        option_cLabel.innerText = questions[question_count].c;

        option_aCheckbox.checked = questions[question_count].a == questions[question_count].selected;
        option_bCheckbox.checked = questions[question_count].b == questions[question_count].selected;
        option_cCheckbox.checked = questions[question_count].c == questions[question_count].selected;

    }
    else
    {
        e.target.disabled = true;
    }
});

next_btn.addEventListener("click",(e)=>{
    if(question_count < questions.length-1)
    {
       prev_btn.disabled = false;
        //set previous question
        questions[question_count].selected = option_aCheckbox.checked?
        questions[question_count].a:option_bCheckbox.checked?
        questions[question_count].b:questions[question_count].c;


        question_count++;
        option_aCheckbox.checked = questions[question_count].a == questions[question_count].selected;
        option_bCheckbox.checked = questions[question_count].b == questions[question_count].selected;
        option_cCheckbox.checked = questions[question_count].c == questions[question_count].selected;

        question.innerText =(question_count+1)+". "+questions[question_count].question;
        option_aLabel.innerText = questions[question_count].a;
        option_bLabel.innerText = questions[question_count].b;
        option_cLabel.innerText = questions[question_count].c;

    }
    else
    {
        e.target.innerText = "Complete";

        let total_marks = questions.map((question)=>question.mark)
                            .reduce((acc,next)=>acc+next);

        let user_final_marks = 0;
        questions.forEach((question)=> {
            if(question.selected == question.correct) user_final_marks+=question.mark;
        });

        let marks_in_percentage = ((user_final_marks/total_marks)*100).toFixed(0);

        document.getElementById("final-marks").innerText = marks_in_percentage+"%";

        let mark_status = marks_in_percentage < 60?
            "Failed":marks_in_percentage <100?
            "Failed but tried":"Passed with distinction";
        document.getElementById("marks-status").innerText = mark_status;
    }
});