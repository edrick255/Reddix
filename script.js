const options = document.querySelectorAll(".option");
const analyzeBtn = document.getElementById("analyze");
const resultDiv = document.getElementById("result");

let answers = [];

// Selección visual + lógica (ORIGINAL)
options.forEach(btn => {
    btn.addEventListener("click", () => {

        const siblings = btn.parentElement.querySelectorAll(".option");
        siblings.forEach(s => s.classList.remove("selected"));

        btn.classList.add("selected");

        answers.push(btn.dataset.value);
    });
});

// Resultado básico (ORIGINAL)
analyzeBtn.addEventListener("click", () => {
    let result = "";

    if (answers.includes("tech")) {
        result = "Podrías estudiar programación, ingeniería o sistemas.";
    } 
    else if (answers.includes("art")) {
        result = "Podrías estudiar diseño, arte digital o multimedia.";
    } 
    else if (answers.includes("business")) {
        result = "Podrías estudiar administración, marketing o finanzas.";
    } 
    else {
        result = "Explora diferentes áreas para encontrar tu camino.";
    }

    resultDiv.style.opacity = 1;
    resultDiv.textContent = result;
});


// ====== SISTEMA PROFESIONAL AGREGADO ======

let scores = {
    tech: 0,
    art: 0,
    business: 0
};

const progressBar = document.getElementById("progress-bar");
const resetBtn = document.getElementById("reset");

let totalQuestions = document.querySelectorAll(".question").length;
let answered = 0;

// Mejora sin romper lo anterior
options.forEach(btn => {
    btn.addEventListener("click", () => {

        const value = btn.dataset.value;

        if (value === "tech" || value === "logic") scores.tech++;
        if (value === "art" || value === "creative") scores.art++;
        if (value === "business" || value === "leader") scores.business++;

        answered++;
        let percent = (answered / totalQuestions) * 100;
        progressBar.style.width = percent + "%";
    });
});

// Resultado avanzado
analyzeBtn.addEventListener("click", () => {

    let max = Math.max(scores.tech, scores.art, scores.business);

    if (max === 0) {
        resultDiv.textContent = "Responde al menos una opción.";
        return;
    }

    if (max === scores.tech) {
        resultDiv.textContent = "Perfil analítico 🔥 → Ingeniería, programación, IA.";
    } 
    else if (max === scores.art) {
        resultDiv.textContent = "Perfil creativo 🎨 → Diseño, animación, contenido digital.";
    } 
    else {
        resultDiv.textContent = "Perfil líder 💼 → Negocios, marketing, emprendimiento.";
    }

    resultDiv.classList.add("show");
});

// Reset
resetBtn.addEventListener("click", () => {

    scores = { tech: 0, art: 0, business: 0 };
    answered = 0;
    answers = [];

    progressBar.style.width = "0%";
    resultDiv.textContent = "";
    resultDiv.classList.remove("show");

    document.querySelectorAll(".option").forEach(btn => {
        btn.classList.remove("selected");
    });
});
// ===== SISTEMA AVANZADO DE PERFIL =====

let advancedScores = {
    tech: 0,
    art: 0,
    business: 0,
    science: 0,
    social: 0,
    numbers: 0
};

// Mejor interpretación de respuestas
options.forEach(btn => {
    btn.addEventListener("click", () => {

        const v = btn.dataset.value;

        if (v === "tech" || v === "logic" || v === "analysis") advancedScores.tech++;
        if (v === "art" || v === "creative" || v === "design") advancedScores.art++;
        if (v === "business" || v === "leader" || v === "manage") advancedScores.business++;

        if (v === "science") advancedScores.science++;
        if (v === "social") advancedScores.social++;
        if (v === "numbers") advancedScores.numbers++;
    });
});

// Resultado más complejo (mezcla de perfiles)
analyzeBtn.addEventListener("click", () => {

    let perfiles = [];

    if (advancedScores.tech > 1) perfiles.push("Tecnología");
    if (advancedScores.art > 1) perfiles.push("Creatividad");
    if (advancedScores.business > 1) perfiles.push("Negocios");
    if (advancedScores.science > 1) perfiles.push("Ciencia");
    if (advancedScores.social > 1) perfiles.push("Social");
    if (advancedScores.numbers > 1) perfiles.push("Análisis numérico");

    if (perfiles.length === 0) {
        resultDiv.textContent = "Necesitas responder más preguntas.";
        return;
    }

    // Sugerencias reales (NO 1 sola carrera)
    let sugerencias = [];

    if (perfiles.includes("Tecnología")) {
        sugerencias.push("Programación", "Ingeniería de software", "Ciberseguridad");
    }

    if (perfiles.includes("Creatividad")) {
        sugerencias.push("Diseño gráfico", "Animación", "UX/UI");
    }

    if (perfiles.includes("Negocios")) {
        sugerencias.push("Marketing", "Administración", "Emprendimiento");
    }

    if (perfiles.includes("Ciencia")) {
        sugerencias.push("Biotecnología", "Medicina", "Investigación");
    }

    if (perfiles.includes("Social")) {
        sugerencias.push("Psicología", "Educación", "Trabajo social");
    }

    if (perfiles.includes("Análisis numérico")) {
        sugerencias.push("Finanzas", "Data Science", "Estadística");
    }

    // Mostrar resultado pro
    resultDiv.innerHTML = `
        <strong>Perfil detectado:</strong><br>
        ${perfiles.join(", ")}<br><br>

        <strong>Áreas recomendadas:</strong><br>
        ${[...new Set(sugerencias)].join(", ")}
    `;

    resultDiv.classList.add("show");
});
// ===== EXPANSIÓN DE ÁREAS PROFESIONALES =====

let careerMap = {
    tech: ["Desarrollo Web", "Ingeniería de Software", "Ciberseguridad", "IA", "Robótica"],
    art: ["Diseño Gráfico", "Animación", "UX/UI", "Arte Digital", "Producción audiovisual"],
    business: ["Marketing", "Finanzas", "Administración", "Emprendimiento", "Ventas"],
    science: ["Medicina", "Biotecnología", "Investigación", "Química", "Física"],
    social: ["Psicología", "Educación", "Trabajo social", "Comunicación"],
    numbers: ["Data Science", "Estadística", "Actuaría", "Análisis financiero"]
};

// Interpretación extendida
options.forEach(btn => {
    btn.addEventListener("click", () => {

        const v = btn.dataset.value;

        if (["code","coding","software","apps","systems","ai","cyber","robotics","engineering"].includes(v)) {
            advancedScores.tech++;
        }

        if (["visual","drawing","animation","ux","media","design","art","expression"].includes(v)) {
            advancedScores.art++;
        }

        if (["finance","market","sales","investment","business","management","strategy","corporate"].includes(v)) {
            advancedScores.business++;
        }

        if (["science","math","data","analysis","complex"].includes(v)) {
            advancedScores.science++;
        }

        if (["social","team","communication"].includes(v)) {
            advancedScores.social++;
        }

        if (["numbers","data","finance"].includes(v)) {
            advancedScores.numbers++;
        }
    });
});

// Resultado expandido
analyzeBtn.addEventListener("click", () => {

    let finalCareers = [];

    for (let key in advancedScores) {
        if (advancedScores[key] > 2 && careerMap[key]) {
            finalCareers.push(...careerMap[key]);
        }
    }

    if (finalCareers.length === 0) {
        resultDiv.textContent = "Responde más preguntas para un resultado preciso.";
        return;
    }

    resultDiv.innerHTML += `<br><br><strong>Opciones profesionales ampliadas:</strong><br>
    ${[...new Set(finalCareers)].join(", ")}`;
});
// ===== MODO CLARO / OSCURO =====

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "Modo oscuro";
    } else {
        themeBtn.textContent = "Modo claro";
    }
});
// ===== EFECTO CLICK BONITO =====
options.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.boxShadow = "0 0 25px rgba(255,180,180,0.8)";
        setTimeout(() => {
            btn.style.boxShadow = "";
        }, 200);
    });
});