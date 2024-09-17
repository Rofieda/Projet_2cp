function pagination(itemClass, containerClass) {
    const items = document.querySelectorAll(itemClass);
    const itemsPerPage = 5; // Show 5 elements per page
    let currentPage = 1;
    let totalPages = Math.ceil(items.length / itemsPerPage);

    function displayItems(page) {
        const resultList = document.querySelector(`.${containerClass}`);
        resultList.innerHTML = ''; // Clear previous content

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, items.length); // Adjust endIndex to avoid displaying more items than available
        for (let i = startIndex; i < endIndex; i++) {
            resultList.appendChild(items[i].cloneNode(true));
        }
        updateSpanStyles(); // Update styles after pagination
    }

    // Function to update span styles dynamically
    function updateSpanStyles() {
        const tabs = document.querySelectorAll(itemClass);
        tabs.forEach(tab => {
            let spans = tab.querySelectorAll("span");
            spans.forEach((span, index) => {
                switch (index) {
                    case 0:
                        span.style.width = "58%";
                        break;
                    case 1:
                    case 2:
                    case 3:
                        span.style.width = "10%";
                        break;
                    case 4:
                        span.style.width = "17%";
                        break;
                    default:
                        break;
                }
            });
        });
    }

    function setupPagination() {
        const paginationElement = document.getElementById('pagination');
        paginationElement.innerHTML = '';

        let startPage = currentPage - 2;
        let endPage = currentPage + 2;

        startPage = Math.max(startPage, 1); // Ensure startPage is not less than 1
        endPage = Math.min(endPage, totalPages); // Ensure endPage is not greater than totalPages

        for (let i = startPage; i <= endPage; i++) {
            const link = document.createElement('a');
            link.textContent = i;
            link.href = '#';
            if (i === currentPage) {
                link.classList.add('active');
            }
            link.addEventListener('click', function () {
                currentPage = i;
                displayItems(currentPage);
                setupPagination();
                updatePaginationButtons();
            });
            paginationElement.appendChild(link);
        }
    }

    function updatePaginationButtons() {
        document.getElementById('lastPageBtn').textContent = 'Dernière';
        document.getElementById('firstPageBtn').textContent = 'Première';
        document.getElementById('prevPageBtn').textContent = '<';
        document.getElementById('nextPageBtn').textContent = '>';

        if (currentPage === 1) {
            document.getElementById('prevPageBtn').disabled = true;
        } else {
            document.getElementById('prevPageBtn').disabled = false;
        }

        if (currentPage === totalPages) {
            document.getElementById('nextPageBtn').disabled = true;
        } else {
            document.getElementById('nextPageBtn').disabled = false;
        }
    }

    document.getElementById('firstPageBtn').addEventListener('click', function () {
        currentPage = 1;
        displayItems(currentPage);
        setupPagination();
        updatePaginationButtons();
    });

    document.getElementById('prevPageBtn').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayItems(currentPage);
            setupPagination();
            updatePaginationButtons();
        }
    });

    document.getElementById('nextPageBtn').addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayItems(currentPage);
            setupPagination();
            updatePaginationButtons();
        }
    });

    document.getElementById('lastPageBtn').addEventListener('click', function () {
        currentPage = totalPages;
        displayItems(currentPage);
        setupPagination();
        updatePaginationButtons();
    });

    displayItems(currentPage);
    setupPagination();
    updatePaginationButtons();
}
