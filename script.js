/**
 * MediCare Hospital - Main JavaScript
 * Author: Manus AI
 * Version: 1.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initDepartmentTabs();
    initTestimonialSlider();
    initAppointmentForm();
    initScrollToTop();
    initScrollAnimation();
    generatePlaceholderImages();
});

/**
 * Initialize Navbar functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize Department Tabs
 */
function initDepartmentTabs() {
    const tabs = document.querySelectorAll('.tab');
    const departmentInfos = document.querySelectorAll('.department-info');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all department info
            departmentInfos.forEach(info => info.classList.remove('active'));
            
            // Show selected department info
            const department = this.getAttribute('data-department');
            document.getElementById(department).classList.add('active');
        });
    });
}

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentSlide = 0;
    const slideCount = slides.length;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
        
        // Add active class to the corresponding dot
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Event listener for previous button
    prevBtn.addEventListener('click', function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = slideCount - 1;
        }
        showSlide(newIndex);
    });

    // Event listener for next button
    nextBtn.addEventListener('click', function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) {
            newIndex = 0;
        }
        showSlide(newIndex);
    });

    // Auto slide change
    setInterval(function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);
}

/**
 * Initialize Appointment Form
 */
function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const department = document.getElementById('department').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!validateForm(name, email, phone, date, time, department)) {
                return;
            }
            
            // Show success message (in a real app, this would send data to a server)
            showAppointmentConfirmation(name, email, phone, date, time, department);
            
            // Reset form
            appointmentForm.reset();
        });
    }
    
    // Form validation function
    function validateForm(name, email, phone, date, time, department) {
        let isValid = true;
        
        // Simple validation
        if (name.trim() === '') {
            alert('Please enter your name');
            isValid = false;
        } else if (email.trim() === '' || !isValidEmail(email)) {
            alert('Please enter a valid email address');
            isValid = false;
        } else if (phone.trim() === '') {
            alert('Please enter your phone number');
            isValid = false;
        } else if (date.trim() === '') {
            alert('Please select a preferred date');
            isValid = false;
        } else if (time === '') {
            alert('Please select a preferred time');
            isValid = false;
        } else if (department === '') {
            alert('Please select a department');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show appointment confirmation
    function showAppointmentConfirmation(name, email, phone, date, time, department) {
        // Create modal or alert with confirmation details
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let timeText = '';
        switch(time) {
            case 'morning':
                timeText = 'Morning (9:00 AM - 12:00 PM)';
                break;
            case 'afternoon':
                timeText = 'Afternoon (1:00 PM - 4:00 PM)';
                break;
            case 'evening':
                timeText = 'Evening (5:00 PM - 8:00 PM)';
                break;
        }
        
        let departmentText = '';
        switch(department) {
            case 'cardiology':
                departmentText = 'Cardiology';
                break;
            case 'neurology':
                departmentText = 'Neurology';
                break;
            case 'orthopedics':
                departmentText = 'Orthopedics';
                break;
            case 'pediatrics':
                departmentText = 'Pediatrics';
                break;
            case 'oncology':
                departmentText = 'Oncology';
                break;
            case 'gynecology':
                departmentText = 'Gynecology';
                break;
        }
        
        const confirmationMessage = `
            Thank you, ${name}!
            
            Your appointment has been scheduled for:
            Date: ${formattedDate}
            Time: ${timeText}
            Department: ${departmentText}
            
            We will send a confirmation to ${email} and contact you at ${phone} if there are any changes.
            
            Please arrive 15 minutes before your scheduled appointment time.
        `;
        
        alert(confirmationMessage);
    }
}

/**
 * Initialize Scroll to Top Button
 */
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize Scroll Animation
 */
function initScrollAnimation() {
    // Get all elements that should be animated on scroll
    const elements = document.querySelectorAll('.about-content, .services-grid, .doctors-grid, .contact-content');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Stop observing the element after it's animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .about-content, .services-grid, .doctors-grid, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .about-content.animate, .services-grid.animate, .doctors-grid.animate, .contact-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .services-grid .service-card, .doctors-grid .doctor-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: calc(var(--i) * 0.1s);
        }
        
        .services-grid.animate .service-card, .doctors-grid.animate .doctor-card {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Set delay variables for staggered animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
    
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
}

/**
 * Generate placeholder images for the hospital app
 * In a real application, these would be replaced with actual images
 */
function generatePlaceholderImages() {
    // Hospital building image
    const hospitalImage = document.getElementById('hospital-image');
    if (hospitalImage) {
        hospitalImage.src = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
    }
    
    // Doctor images
    const doctor1Image = document.getElementById('doctor1-image');
    if (doctor1Image) {
        doctor1Image.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
    }
    
    const doctor2Image = document.getElementById('doctor2-image');
    if (doctor2Image) {
        doctor2Image.src = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
    }
    
    const doctor3Image = document.getElementById('doctor3-image');
    if (doctor3Image) {
        doctor3Image.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
    }
    
    const doctor4Image = document.getElementById('doctor4-image');
    if (doctor4Image) {
        doctor4Image.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
    }
    
    // Map image
    const mapImage = document.getElementById('map-image');
    if (mapImage) {
        mapImage.src = 'https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=600x400&markers=color:red%7C40.7128,-74.0060&key=YOUR_API_KEY';
    }
}
