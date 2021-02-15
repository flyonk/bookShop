function toCurrency(price) {
  return new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
  }).format(price);
}

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector(".basket");
if ($card) {
  $card.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    fetch("/card/remove/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((card) => {
        if (card.books.length) {
          const html = card.books
            .map((c) => {
              return `
            <tr>
                <td>${c.name}</td>
                <td>${c.count}</td>
                <td><button class="btn btn-small js-remove" data-id="${c.id}">Удалить</button></td>
            </tr>
                `;
            })
            .join("");
          $card.querySelector("tbody").innerHTML = html;
          $card.querySelector(".price").textContent = toCurrency(card.price);
        } else {
          $card.innerHTML = `<p>Корзина пуста</p>`;
        }
      });
  });
}
