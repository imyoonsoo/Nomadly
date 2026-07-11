# git 규칙

## commit convention

참고: https://sungwookoo.tistory.com/1

### 커밋 type

| 태그       | 설명                                             |
| ---------- | ------------------------------------------------ |
| `feat`     | 새로운 기능 추가                                 |
| `fix`      | 버그 수정                                        |
| `docs`     | 문서 수정                                        |
| `style`    | 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등) |
| `design`   | 사용자 UI 디자인 변경 (CSS 등)                   |
| `test`     | 테스트 코드 작성/리팩토링 (Test Code)            |
| `refactor` | 리팩토링 (Production Code)                       |
| `build`    | 빌드 파일 수정                                   |
| `ci`       | CI 설정 파일 수정                                |
| `pref`     | 성능 개선                                        |
| `chore`    | 자잘한 수정이나 빌드 업데이트                    |
| `rename`   | 파일 혹은 폴더명을 수정만 한 경우                |
| `remove`   | 파일을 삭제만 한 경우                            |

### 커밋 메시지 형식

```
feat: 세부사항
```

## 브랜치 전략

- 기본적으로 `gitflow` 전략을 따른다.
- 브랜치는 `main`, `develop`, `feature`, `refactor`, `fix`, `release` 여섯 가지를 사용한다.
  - **main**: 기준이 되는 브랜치로 제품을 배포하는 브랜치
  - **develop**: 각자 작업한 기능들을 Merge하는 개발 브랜치
  - **feature**: 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 Merge
  - **refactor**: 리팩토링 브랜치로 완료되면 develop 브랜치에 Merge
  - **fix**: main 브랜치로 배포를 했는데 버그가 생겼을 때 긴급 수정하는 브랜치
  - **release**: develop을 main으로 합치기 전 QA를 하기 위한 브랜치
- 브랜치 이름은 `브랜치 종류/작업내용`으로 생성하여 작업한다. (띄어쓰기는 하이픈 `-`으로 대체)
  - ex) `feature/main-page`
- 브랜치를 merge할 때는 항상 `--no-ff` 옵션을 붙여 branch에 대한 기록이 사라지는 것을 방지하는 것을 원칙으로 한다.

### 참고: gitflow 전략

- 자세한 진행 과정은 우아한형제들 기술블로그 "우린 Git-flow를 사용하고 있어요" 참고.

![gitflow 과정](https://velog.velcdn.com/images%2Fkw2577%2Fpost%2F9f1340a8-80f7-4c6a-ada5-d93ab0d877c9%2Fimage.png)
