
        let currentIndex = 0;
        function moveSlide(direction) {
            const slides = document.querySelectorAll(".slide");
            slides[currentIndex].style.opacity = 0;
            setTimeout(() => {
                slides[currentIndex].style.display = "none";
                currentIndex = (currentIndex + direction + slides.length) % slides.length;
                slides[currentIndex].style.display = "flex";
                setTimeout(() => {
                    slides[currentIndex].style.opacity = 1;
                }, 50);
            }, 500);
        }

        function autoSlide() {
            moveSlide(1); /* Move to the next slide */
        }

        document.addEventListener("DOMContentLoaded", () => {
            const slides = document.querySelectorAll(".slide");
            slides.forEach((slide, index) => {
                slide.style.display = index === 0 ? "flex" : "none";
                slide.style.opacity = index === 0 ? 1 : 0;
                slide.style.transition = "opacity 0.5s ease-in-out";
            });
            setInterval(autoSlide, 5000); /* Automatically transition every 5 seconds */
        });


        document.addEventListener("DOMContentLoaded", function () {
            let dataset = [];
        
            // Load the marketplace dataset
            fetch("marketplace.json")
                .then(response => response.json())
                .then(data => {
                    dataset = data;
                    console.log("Marketplace Data Loaded:", dataset);
                });
        
            const chatInput = document.getElementById("chat-input");
            const chatHistory = document.getElementById("chat-history");
            const sendBtn = document.getElementById("send-btn");
        
            function searchMarketplace(query) {
                query = query.toLowerCase();
            
                // Predefined chatbot responses for greetings and general questions
                const generalResponses = {
                    // Greetings & Small Talk
                    "hello": "👋 Hi there! How can I assist you today?",
                    "hi": "Hello! Looking for something specific?",
                    "hey": "Hey there! Need help finding a product?",
                    "good morning": "Good morning! How can I help?",
                    "good afternoon": "Good afternoon! Looking to buy or sell?",
                    "good evening": "Good evening! Let me know what you need.",
                    "how are you": "I'm just a bot, but I'm always ready to help!",
                    "who are you": "I'm your friendly marketplace assistant! 😊",
                    "what can you do": "I can help you find, buy, and sell items on campus!",
                    "are you human": "Nope, just a bot! But I try my best. 🤖",
                    "what is your name": "I'm your campus marketplace assistant!",
                    "thank you": "You're welcome! 😊 Let me know if you need anything else.",
                    "thanks": "No problem! Happy to help.",
                    "bye": "Goodbye! Have a great day! 👋",
                    "goodbye": "See you later! Hope you find what you're looking for.",
                
                    // Buying & Searching for Products
                    "buy": "You can search for products by typing their name or category. Try asking: 'Do you have bikes for sale?'",
                    "i want to buy something": "Great! What are you looking for?",
                    "show me products": "What type of product are you interested in? Books, electronics, furniture?",
                    "do you have books": "Yes! Try searching 'books' to see what's available.",
                    "do you have electronics": "Yes! We have listings for laptops, phones, and more.",
                    "do you have clothes": "Yes! You can check the clothing category for available items.",
                    "show me the cheapest items": "Looking for budget-friendly deals? Try searching by category!",
                    "what's available": "We have items in categories like books, electronics, and furniture. What are you looking for?",
                    "do you have macbooks": "Let me check... Try searching for 'MacBook' in the marketplace.",
                    "can i negotiate the price": "Yes, many sellers are open to negotiations!",
                    "who is selling a bike": "Let me check our listings for bikes!",
                    "do you have used textbooks": "Yes! Many students sell used textbooks here.",
                
                    // Selling & Listing Items
                    "sell": "To sell an item, click the 'Sell an Item' button and enter the details.",
                    "i want to sell something": "Awesome! What are you selling?",
                    "how do i sell an item": "Provide the item name, category, price, and your contact info!",
                    "where can i list my item": "Right here! Use the 'Sell an Item' feature to add your listing.",
                    "how much should i sell my item for": "Check similar listings to set a fair price!",
                    "can i edit my listing": "Currently, you may need to remove and re-add the item with updated details.",
                    "can i delete my listing": "Yes, you can remove it from your active listings.",
                    "how do i get more buyers": "Make sure your price is competitive and add a clear description!",
                    "what should i include in my listing": "Item name, price, category, and good contact details.",
                    
                    // Price & Negotiation
                    "how much is a laptop": "Laptop prices vary by brand and condition. Try searching for 'laptop'.",
                    "how much do textbooks cost": "Used textbooks are often cheaper. Try searching for 'textbooks'.",
                    "can i get a discount": "It depends on the seller! Feel free to negotiate.",
                    "is this the final price": "You can ask the seller if they're open to offers.",
                    "is the price negotiable": "Some sellers allow price negotiations—ask them directly!",
                    
                    // Contacting Sellers & Buyer Assistance
                    "how do i contact a seller": "Once you find an item, you can see the seller's contact details.",
                    "can i message a seller": "Yes! Sellers usually provide email or phone numbers.",
                    "how do i know if a seller is legit": "Look for detailed listings and verified contact info.",
                    "can i meet the seller on campus": "Yes! Meeting in public places on campus is recommended.",
                    "how long does a seller take to reply": "Most sellers respond within a few hours or a day.",
                    "how do i ask a seller about an item": "You can email them or message them with questions!",
                    
                    // Payment & Transactions
                    "how do i pay": "Most transactions are done in cash or via e-transfer.",
                    "can i pay with cash": "Yes, many sellers accept cash payments in person.",
                    "is online payment available": "Some sellers may accept PayPal or bank transfers.",
                    "should i pay before pickup": "It's best to pay after inspecting the item in person.",
                    "is it safe to pay online": "Make sure you trust the seller before making an online payment.",
                    "can i reserve an item": "You can ask the seller if they’re willing to hold it for you.",
                    
                    // Delivery & Pickup
                    "where can i pick up my item": "Most students meet at libraries or cafeterias on campus.",
                    "does the seller deliver": "Some sellers offer delivery, but most require in-person pickup.",
                    "can i get the item shipped": "Most sales are local, but you can ask the seller about shipping.",
                    "is delivery included in the price": "Usually, buyers and sellers arrange pickup separately.",
                    
                    // Safety & Scams
                    "how do i avoid scams": "Always meet in person, inspect the item, and never share private details.",
                    "is it safe to buy here": "Yes! Just follow safety guidelines like meeting in public areas.",
                    "should i meet in a public place": "Yes, meeting in a safe public space is always a good idea!",
                    "what if the seller doesn't show up": "Try contacting them again. If they don’t respond, find another deal.",
                    "can i report a scam": "Yes! If you encounter a suspicious seller, report it to campus authorities.",
                    
                    // Miscellaneous & Fun Responses
                    "what's the best deal": "I can help you find the best deals! Try searching for 'cheap items'.",
                    "tell me a joke": "Why did the smartphone go to therapy? It lost all its connections! 😂",
                    "what's the weather like": "I'm not a weather bot, but I can help you find great deals!",
                    "do you like shopping": "I love helping people find the best deals!",
                    "are you smarter than siri": "I focus on campus deals, so I’m the best at that! 😉",
                    "where can i find a part-time job": "Check student job boards or campus announcements!",
                    "what's the most popular item": "Laptops and textbooks are always in high demand!",
                    "what's the cheapest thing here": "Try searching 'cheapest' to see budget-friendly deals.",
                    "how do i get more discounts": "Check with sellers, some might offer student discounts!",
                    "where can i find free stuff": "Some students give away free items. Try searching 'free'!",
                    "is this chatbot smart": "I try my best! 😊 Let me know how I can improve.",
                    "can i rename you": "Sure! What would you like to call me?",
                    "who created you": "I was built to help students buy and sell items easily!",
                    "will you remember me": "I remember your searches, but not personal details.",
                    "do you have a personality": "Of course! I love helping students find great deals.",
                    "can i hack you": "😱 Please don't! I just want to help you shop smarter.",
                    "how old are you": "I'm timeless—always here to assist you!",
                    "can you dance": "Only in binary! 💃🏻🕺",




                    //Goodbye
                    "cya":"Sad to see you go :(",
                    "see you":"Sad to see you go :(",
                    "bye bye":"Sad to see you go :(",
                    "See you later":"Talk to you later",
                    "Goodbye":"Talk to you later",
                    "I am Leaving":"Talk to you later",
                    "Bye":"Talk to you later",
                    "Have a Good day":"Goodbye!",
                    "talk to you later":"Goodbye!",
                    "ttyl":"Goodbye!",
                    "i got to go":"Goodbye!",
                    "gtg":"Come back soon"

                    
                    
                    
                    
                };
            
                // Check for general chatbot responses
                if (generalResponses[query]) {
                    return generalResponses[query];
                }
            
                // Check for products in the dataset and user-listed items
                let allItems = [...dataset, ...JSON.parse(localStorage.getItem("marketplaceItems")) || []];
            
                for (let item of allItems) {
                    if (item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)) {
                        return `
                            <div class="product-card">
                                <h4>${item.name} - $${item.price}</h4>
                                <p>📍 Category: ${item.category}</p>
                                <p>👤 Seller: ${item.seller}</p>
                                <p>📩 Contact: <a href="mailto:${item.contact}">${item.contact}</a></p>
                            </div>
                        `;
                    }
                }
            
                return "❌ Sorry, I couldn't find anything related to your query.";
            }
        
            function sendMessage() {
                let msg = chatInput.value.trim().toLowerCase();
                if (msg === "") return;
        
                let reply;
                if (msg.includes("sell") || msg.includes("list item")) {
                    reply = "📝 To sell an item, provide: Name, Category, Price, and Contact info.";
                } else {
                    reply = searchMarketplace(msg);
                }
        
                chatHistory.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
                chatHistory.innerHTML += `<p><strong>Bot:</strong> ${reply}</p>`;
        
                chatInput.value = "";
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }
        
            sendBtn.addEventListener("click", sendMessage);
            chatInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    sendMessage();
                }
            });
        });

