function getFile(docName) {
  return fetch(`docs-templates/${docName}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then((blob) => {
      return blob.arrayBuffer();
    })
    .then((arrayBuffer) => {
      return arrayBuffer;
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function buildAndDownloadDocument(docName, isConstruct) {
  getFile(docName).then(async (arrayBuffer) => {
    let buffer;
    let blob;
    const nameSplit = docName.split('.');
    const format = nameSplit[nameSplit.length - 1];
    if (isConstruct == true && format == 'docx') {
      const zip = new PizZip(arrayBuffer);
      const doc = new window.docxtemplater()
        .loadZip(zip)
        .setOptions({ linebreaks: true });
      const data = {
        first: firstText,
        second: secondText,
        pril: pril,
      };
      doc.setData(data);
      doc.render({});
      buffer = doc.getZip().generate({ type: 'uint8array' });
      blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
    } else if (format == 'docx') {
      const zip = new PizZip(arrayBuffer);
      buffer = zip.generate({ type: 'uint8array' });
      blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
    } else if (format === 'pdf') {
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      const pdfBytes = await pdfDoc.save();
      buffer = new Uint8Array(pdfBytes);
      blob = new Blob([buffer], { type: 'application/pdf' });
    }
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docName}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

const prilVars = [
  {
    key: 'q3v1',
    val: ' Копии документов, подтверждающих право собственности гражданина на имущество, и документов, удостоверяющих исключительные права на результаты интеллектуальной деятельности гражданина',
  },
  {
    key: 'q3v2',
    val: ' Копии документов о совершавшихся гражданином в течение трех лет до даты подачи заявления сделках с недвижимым имуществом, ценными бумагами, долями в уставном капитале, транспортными средствами и сделках на сумму свыше трехсот тысяч рублей',
  },
  {
    key: 'q3v3',
    val: ' Выписка из реестра акционеров (участников) юридического лица, акционером (участником) которого является гражданин',
  },
  {
    key: 'q3v4',
    val: ' Копия свидетельства о постановке на учет в налоговом органе',
  },
  {
    key: 'q3v5',
    val: ' Копия свидетельства о заключении брака.',
  },
  {
    key: 'q3v6',
    val: ' Копия свидетельства о расторжении брака, если оно выдано в течение трех лет до даты подачи заявления',
  },
  {
    key: 'q3v7',
    val: ' Копия брачного договора',
  },
  {
    key: 'q3v8',
    val: ' Копия соглашения или судебного акта о разделе общего имущества супругов, соответственно заключенного и принятого в течение трех лет до даты подачи заявления',
  },
  {
    key: 'q3v9',
    val: ' Копия трудовой книжки',
  },
];

function prilByKey(key) {
  for (let i = 0; i < prilVars.length; i++) {
    if (prilVars[i].key == key) {
      return prilVars[i].val;
    }
  }
}

let firstText;
let secondText;
let pril;

$(document).ready(function () {
  $('.tooltiptext').hide();

  $('.tooltip').click(function () {
    var accordionItem = $(this).parent();
    accordionItem.toggleClass('active');
    accordionItem.find('.tooltiptext').slideToggle();
    $(this).toggleClass('active');
  });


  // аккордион
  /*
  var acc = document.getElementsByClassName("tooltip");
  var index;

  for (index = 0; index < acc.length; i++) {
    acc[index].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.Height = null;
      } else {
        panel.style.Height = panel.scrollHeight + "px";
      } 
    });
  }*/

  const buildBtn = $('#build-btn');

  $('#question1-comment').css({ display: 'none' });
  $('#question2-comment').css({ display: 'none' });

  $(buildBtn).click(function () {
    const answer1 = $('.question1').find("input[type='radio']:checked").val();
    const answer3 = $('.question3').find("input[type='checkbox']:checked");

    if (answer1) {
      $('#question1-comment').css({ display: 'none' });
      switch (answer1) {
        case 'q1v1':
          firstText =
            'Учитывая изложенное, считаю необходимым признать мое заявление обоснованным и ввести процедуру реструктуризации долгов (необходимо подтвердить соответствие требованиям пункта 1 статьи 213.13 Закона о банкротстве).';
          secondText =
            'Признать мое заявление обоснованным и ввести процедуру реструктуризации долгов.';
          break;
        case 'q1v2':
          firstText =
            'Учитывая изложенное, считаю необходимым признать мое заявление обоснованным, ходатайствую о принятии в порядке пункта 6 статьи 213.6 Закона о банкротстве решения о признании меня банкротом и введении процедуры реализации имущества гражданина, поскольку имеющаяся у меня задолженность не подлежит реструктуризации по причине моего несоответствия требованиям пункта 1 статьи 213.13 Закона о банкротстве (указать конкретное основание).';
          secondText =
            'Признать мое заявление обоснованным, признать меня банкротом и ввести процедуру реализации имущества.';
          break;
      }

      let counter = 15;
      pril =
        '1. Документы, подтверждающие наличие задолженности, основание ее возникновения и неспособность гражданина удовлетворить требования кредиторов в полном объеме\t\n\n' +
        '2. Документы, подтверждающие наличие или отсутствие у гражданина статуса индивидуального предпринимателя на основании выписки из единого государственного реестра индивидуальных предпринимателей либо иного подтверждающего указанные сведения документа.\t\n\n' +
        '3. Списки кредиторов и должников гражданина с указанием их наименования или фамилии, имени, отчества, суммы кредиторской и дебиторской задолженности, места нахождения или места жительства кредиторов и должников гражданина, а также с указанием отдельно денежных обязательств и (или) обязанности по уплате обязательных платежей, которые возникли в результате осуществления гражданином предпринимательской деятельности.\t\n\n' +
        '4. Опись имущества гражданина с указанием места нахождения или хранения имущества, в том числе имущества, являющегося предметом залога, с указанием наименования или фамилии, имени и отчества залогодержателя.' +
        '5. Сведения о полученных физическим лицом доходах и об удержанных суммах налога за трехлетний период, предшествующий дате подачи заявления о признании гражданина банкротом\t\n\n' +
        '6. Документы о счетах в банках: справка из ФНС об открытых / закрытых счетах, выписки по банковским счетам справки об остатках по депозитам и вкладам, информация об электронных кошельках.\t\n\n' +
        '7. Копия документа, подтверждающего регистрацию в системе индивидуального (персонифицированного) учета.\t\n\n' +
        '8. Сведения о состоянии индивидуального лицевого счета застрахованного лица;\t\n\n' +
        '9. Копия решения о признании гражданина безработным, выданная государственной службой занятости населения, в случае принятия указанного решения;\t\n\n' +
        '10. Копия свидетельства о рождении ребенка, если гражданин является его родителем, усыновителем или опекуном\t\n\n' +
        '11. Документы, подтверждающие иные обстоятельства, на которых основывается заявление гражданина\t\n\n' +
        '12. Доказательство уплаты государственной пошлины в размере 300 рублей или мотивированное ходатайство об ее отсрочке, рассрочке, уменьшении, освобождении от ее уплаты\t\n\n' +
        '13. Доказательство направления копии заявления кредиторам (почтовые квитанции, расписки о вручении, почтовые уведомления)\t\n\n' +
        '14. Доказательство внесения на депозитный счет Арбитражного Суда денежных средств для оплаты вознаграждения финансовому управляющему либо мотивированное ходатайство о предоставлении отсрочки внесения средств на выплату вознаграждения финансовому управляющему сроком до даты судебного заседания по рассмотрению обоснованности заявления о признании гражданина банкротом;\t\n\n' +
        '15. Копия паспорта (копии всех листов, как с отметками, так и не заполненных)';

      pril += '\t\n\n';
      for (let i = 0; i < answer3.length; i++) {
        const element = answer3[i].value;
        counter++;
        pril += counter + '.' + prilByKey(element) + '\t\n\n';
      }

      buildAndDownloadDocument('Заявление.docx', true);
    } else {
      $('#question1-comment').css({ display: 'block' });
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $('#question1-comment').offset().top - 400,
        },
        1000,
      );
    }
  });
});