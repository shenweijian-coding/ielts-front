import { wordLabel } from '@/api/book/index';
import { ref } from 'vue'
import { ElMessage, ElMessageBox, ElCheckbox } from 'element-plus';
import { useUserStore } from '@/store';
const userStore = useUserStore();

// 标熟的
function useProficient() {
  function request(ids,type, cb) {
    wordLabel({
      type: type,
      lexicon_ids: JSON.stringify(ids),
    })
      .then((res) => {
        ElMessage.success(type == 'proficient' ? '单词标熟成功' : '单词已取消标熟');
        cb(ids, type == 'proficient');
      })
      .catch((err) => {});
  };

  // 取消标熟
  function handleProficientCancel(ids,cb) {
    request(ids, 'cancel_proficient', cb);
  }
  // 标熟
  function handleProficient(ids,cb) {
    let checked = false;
    if (userStore.getConfig.proficient_tip) {
      request(ids, 'proficient', cb);
    } else {
      ElMessageBox({
        title: ``,
        message: () => (
          <div>
            <p style="fontSize: 22px">确定将选中的单词标为熟词吗？</p>
            <p style="fontSize: 22px">
              单词标熟后<b>错词本不再展示</b>，听写时<b>自动跳过</b>
            </p>
            <br />
            <ElCheckbox onChange={(check) => (checked = check)} size="small">
              不再提醒
            </ElCheckbox>
          </div>
        ),
        confirmButtonText: '标熟',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: '',
        distinguishCancelAndClose: true,
      }).then(() => {
        request(ids, 'proficient', cb);
        userStore.handleConfig('proficient_tip', Number(checked));
      }).catch(() => {});
    }
  }
  return {
    handleProficient,
    handleProficientCancel

  }
}
export { useProficient };
