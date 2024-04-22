import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MarkDownIt from 'markdown-it';
import { ActionGroupDirective } from './components/action-group.directive';
import { ActionDirective } from './components/action.directive';
import { ButtonComponent } from './components/button/button.component';
import { ItemComponent, ListComponent } from './components/list/list.component';
import { OnPushComponent } from './components/on-push/on-push.component';
import { StoreTestComponent } from './components/store/store-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonComponent,
    ListComponent,
    ItemComponent,
    OnPushComponent,
    StoreTestComponent,
    ActionGroupDirective,
    ActionDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ng-17';
  flag = false;
  normalString: string = '';

  @ViewChildren(ButtonComponent) buttons:
    | QueryList<ButtonComponent>
    | undefined;

  constructor() {
    setTimeout(() => {
      this.flag = true;
    }, 3000);
  }

  ngOnInit() {
    const markdown = new MarkDownIt({
      html: true,
      breaks: true,
    });
    const html = `<span _ngcontent-ng-c3979939819="" class="chat-message-content-text rich-text-style ng-star-inserted"><pre>(C) I didn't know what to think and what to do. He didn't move, nor did he blink. (c) He&nbsp;just stared at me, so all I could do to escape his penetrating eyes was close my eyes, call out to my dad, and cover my face with my blanket. I dared not turn to the other side of the bed in fear that (d) he'd be there, too.<br> &nbsp; <br>(D) After a while, my dad came into my room and asked me what was wrong. When I opened my eyes to answer, however, I couldn't find (e) the man. My dad checked if there was anything strange, but everything in my room was exactly how it was. He returned to his room assuring me that there was nothing strange in my room. <br> &nbsp; <br>1. 위 글 (A)에 이어질 내용을 순서에 맞게 배열한 것으로 가장 적절한 것은?<br>① (B) - (C) - (D) ② (C) - (B) - (D)<br>③ (C) - (D) - (B) ④ (D) - (B) - (C)<br>⑤ (D) - (C) - (B)<br> &nbsp; <br>2. 위 글의 상황에 나타난 분위기로 가장 적절한 것은?<br>① calm and peaceful  ② desolate and gloomy<br>③ exciting and festive ④ scary and mysterious<br>⑤ monotonous and boring<br> &nbsp; <br>3. 밑줄 친 (a)~(e) 중에서 가리키는 대상이 나머지 넷과 다른것은?<br>① (a) ② (b) ③ (c) ④ (d) ⑤ (e)<br> &nbsp; <br> &nbsp; <br>[04~06] 다음 글을 읽고, 물음에 답하시오.<br>(A) Susan was waiting for her train on the platform with her friend, Michael. He wanted her to take a half of a sandwich (a) he&nbsp;had left over from dinner. She told him she didn't want it, but he kept insisting through the course of their conversation. Susan and Michael lived in different directions and her train came in first, so she said goodnight to him and got on the train and sat down.<br> &nbsp; <br>(B) When the nearly empty train was one stop before her station, a homeless man came through the door of the adjoining car. He was very dirty and *mumbling to himself. As he neared her, she could see his eyes were very wild-looking. (b) He&nbsp;came towards her and without a word grabbed her by the right jacket sleeve. She was terrified. His face started to get closer to hers, when all of a sudden she remembered the sandwich in her bag.</pre><p>출처: <a href="https://englishparadise.tistory.com/17" rel="noopener noreferrer" target="_blank">https://englishparadise.tistory.com/17</a> [영어 학습 자료 파라다이스:티스토리]</p></span>`;
    const html2 = `<span _ngcontent-ng-c3979939819="" class="chat-message-content-text rich-text-style ng-star-inserted"><p>문자열 테스트 입니다.<br><br></p><ol><li class="ql-indent-0">이것들은 무엇인지</li><li class="ql-indent-0">나는 알수 없지만</li><li class="ql-indent-0">정녕</li></ol><p><br><strong>하하하</strong><br><br><strong>하이용</strong></p></span>`;
    const html3 = `<span _ngcontent-ng-c3979939819="" class="chat-message-content-text rich-text-style ng-star-inserted"><p><a data-member-profile="2011200058120ksgKdRl" data-member-profile-align="right center" data-mention-id="2011200058120ksgKdRl" data-mention="@FE Tester" class="mention-string mention-name-link">@FE Tester</a> sadasdasdasd</p></span>`;
    const html4 = `<span _ngcontent-ng-c3979939819="" class="chat-message-content-text rich-text-style ng-star-inserted"><p><strong>천국의 계단으로....</strong><br><br>2004년 새해가 밝았습니다.<br>어느새 설날이 다가왔습니다.<br>이때가 되면 생각하는 것은 하나님은 우리에게 또 한 장의 도화지를 주셨다고 생각합니다.<br>'1년 365일'시간(時間)이라는 도화지(圖畵紙)&nbsp;위에&nbsp;실천(實踐)이라는 붓으로, 우리는&nbsp;인생(人生)이라는 그림을&nbsp;그리는 것이라 생각을 해봅니다.<br>그래서 2004년에는 각자 자기가 원하는 그림을 구상하고, 계획하고, 생각하면서, 훌륭한 삶의 그림을 그려야 한다고 생각합니다.<br>그런데 그림도 무작정 그리면 안됩니다.<br>열정과 패기를 가지고, 철저한 계획과 준비와 끊임없이 훈련하면서 그려야 합니다.<br>거기에 언제나 '상냥한 웃음'과 '아름다운 친절'과 '존경의 인사'라는 '물감'을 사용한다면 더욱더 아름다운 그림이 그려지리라 생각합니다. 물론 거기에 '지혜(智慧)'라는 물감까지 첨가하면 더욱 좋겠지요.<br>그림이라는 말을 쓰니 그 옛날 "한니발 장군"의 일화가&nbsp;생각납니다.<br>한니발 장군은 나폴레옹보다 거의 2천년 가까이 앞선 BC 217년에 알프스 산맥을 넘어 로마로 진군했던 '카르타고'의 명장(名將)입니다. 그가 이탈리아 남부 칸나에 평원에서 로마군을 박살낸 ‘칸나에 전투’는 세계 모든 육사(陸士) 교과서에서 다뤄질 정도입니다 . 한니발 장군 부대는 프랑스를 점령하고 알프스산맥을 넘어 세계 최강의 로마를 점령했습니다.<br>한니발 장군이 젊었을 때 이야기입니다.<br>한니발 장군의 외형은 불행히도 애꾸눈이었습니다.<br>그래서 항상 콤플렉스를 지니고 있었습니다.<br>어느날 화가에게 자기 초상화를 그려달라고 했습니다. 그 화가는 사실 그대로 애꾸눈인 한니발 얼굴 모습으로 그렸습니다. 그러자 한니발은 애꾸눈인 자화상을 보면서 화를 내면서 그 화가를 꾸짖었습니다. 이번에는 다른 화가에게 부탁했습니다. 이번 화가는 앞의 화가처럼 그리면 혼날 것이 뻔하기에 정상적인 눈을 가진 초상화를 그렸습니다. 한니발은 이번에도 화를 냈습니다. 자기의 모습이 아니라는 것입니다.<br>또 다른 화가에게 맡겼습니다.<br><strong>[출처]</strong>&nbsp;<a href="https://blog.naver.com/faxwhite/60054630600" rel="noopener noreferrer" target="_blank">좋은글 장문</a>|<strong>작성자</strong>&nbsp;<a href="https://blog.naver.com/faxwhite" rel="noopener noreferrer" target="_blank">whitecong</a></p></span>`;

    const normalString = this.htmlToFormattedText(html4) || '';
    console.log('this.normalString', normalString);
    this.normalString = markdown.render(normalString);
  }

  htmlToFormattedText(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const rootNode = doc.body;

    function processNode(node: any) {
      let markdown = '';

      node.childNodes.forEach((child: any) => {
        if (child.nodeType === Node.TEXT_NODE) {
          markdown += child.nodeValue;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          switch (child.tagName.toLowerCase()) {
            case 'h1':
              markdown += `\n# ${processNode(child)}\n`;
              break;
            case 'p':
              markdown += `\n${processNode(child)}\n`;
              break;
            case 'strong':
              markdown += `**${processNode(child)}**`;
              break;
            case 'em':
              markdown += `*${processNode(child)}*`;
              break;
            case 'ul':
              markdown += `\n${processNode(child)}\n`;
              break;
            case 'ol':
              markdown += `\n${processNode(child)}\n`;
              break;
            case 'li':
              markdown += `- ${processNode(child)}\n`;
              break;
            case 'br':
              markdown += '\n';
              break;
            case 'a':
              const href = child.getAttribute('href');
              if (href) {
                markdown += `[${processNode(child)}](${href})`;
              }
              break;
            case 'pre':
              // <pre> 태그의 경우, 내용을 백틱 3개로 감싼 코드 블록으로 변환
              markdown += `\n\`\`\`\n${processNode(child)}\n\`\`\`\n`;
              break;
            default:
              markdown += processNode(child);
          }
        }
      });

      return markdown;
    }

    return processNode(rootNode).trim();
  }

  ngAfterViewInit(): void {
    const heights = this.buttons?.map((button) => {
      return button.height();
    });
  }

  onClickedButton() {}

  create() {}

  update() {}
}
