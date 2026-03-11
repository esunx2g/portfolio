const sectionTargets = [
    { id: 'about-slot', file: 'sections/about.html' },
    { id: 'publications-slot', file: 'sections/publications.html' },
    { id: 'projects-slot', file: 'sections/projects.html' },
    { id: 'study-slot', file: 'sections/study.html' },
    { id: 'contact-slot', file: 'sections/contact.html' },
];

const formatCount = (count) => String(count).padStart(2, '0');

async function loadSections() {
    const loads = sectionTargets.map(async ({ id, file }) => {
        const target = document.getElementById(id);

        if (!target) {
            return;
        }

        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }

            target.outerHTML = await response.text();
        } catch (error) {
            console.error(error);
            target.innerHTML = `<section class="py-12 text-sm text-red-500">Failed to load ${file}</section>`;
        }
    });

    await Promise.all(loads);
}

function updateCounts() {
    const publicationCountEl = document.getElementById('publication-count');
    const projectCountEl = document.getElementById('project-count');

    if (publicationCountEl) {
        const publicationCount = document.querySelectorAll('#publications .content-card').length;
        publicationCountEl.textContent = `Publication Count: ${formatCount(publicationCount)}`;
    }

    if (projectCountEl) {
        const projectCount = document.querySelectorAll('#projects .content-card').length;
        projectCountEl.textContent = `Project Count: ${formatCount(projectCount)}`;
    }
}

async function initializePage() {
    await loadSections();
    updateCounts();

    if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise();
    }
}

initializePage();
