export function showDetails(event) {
    const detailsSection = event.target.parentNode.querySelector('.details');

    if(detailsSection.style.display == 'block') {
        detailsSection.style.display == 'none';
    } else {
        detailsSection.style.display == 'block';
    }
}